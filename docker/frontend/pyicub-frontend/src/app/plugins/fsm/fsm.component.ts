import {Component, OnInit, ViewChild, OnDestroy} from '@angular/core';
import {WidgetBaseComponent} from "../../widget-base/widget-base.component";
import {InputNode} from "../../graphy/models/input-node.model";
import {InputEdge} from "../../graphy/models/input-edge.model";
import {NodeStatus} from "../../types/FSM";
import {GraphyComponent} from "../../graphy/graphy.component";
import {forkJoin} from "rxjs";

interface nodeData {
  name: string,
  state: NodeStatus,
  description: string
}

@Component({
  selector: 'app-plugin1',
  templateUrl: './fsm.component.html',
  styleUrl: './fsm.component.css'
})
export class FsmComponent extends WidgetBaseComponent implements OnInit, OnDestroy {

  showErrorDialog: boolean = false;
  errorMessage: string;
  pollingInterval: any; // Variable to hold the interval reference

  private _graphy: GraphyComponent<any, any>;
  @ViewChild(GraphyComponent)
  set graphy(value: GraphyComponent<any, any>) {
    this._graphy = value;
    if (this._graphy && this.currentNodeID) {
      const nodeID = this.currentNodeID == "init" ? this.startingNode.nodeID : this.currentNodeID
      this._graphy.setFocusToNode(nodeID);
    }
  }

  get graphy(): GraphyComponent<any, any> {
    return this._graphy;
  }

  nodeColors = {
    INACTIVE: 'white',
    ACTIVE: 'white',
    RUNNING: 'greenyellow',
    FAILED: 'red',
    CURRENT: 'white',
    DONE: 'green',
    TIMEOUT: 'yellow'
  }

  isLoading = true;

  nodes: InputNode<nodeData>[] = [];
  edges: InputEdge[] = [];
  currentNodeID: string;
  previousNodeID: string;

  startingNode: { nodeID: string, startTrigger: string } = undefined;
  terminalNodes: { nodeID: string, restartTrigger: string }[] = [];

  ngOnInit() {
    // Polling mechanism: print message to console every 1000ms and execute checkAsyncRequestStatus

    this.pollingInterval = setInterval(() => {
      console.log("Polling message: Component is alive and polling every 1000ms");
    
      // Call fsmGetProcesses and pass the reqID to checkAsyncRequestStatus
      this.fsmGetCurrentState().subscribe(currentState => {
        

        if (currentState == "init") {
          if(this.previousNodeID) {
            this.updateNodeState(this.getNodeByID(this.previousNodeID), NodeStatus.INACTIVE);
          }
          return;
        }

        let currentNode = this.getNodeByID(currentState);

        // Fetch current state first
        this.fsmGetCurrentProcess().subscribe(reqID => {          
      
          this.currentNodeID = currentNode.id;
          
          const onRunning = () => {
            if(this.previousNodeID == currentNode.id) {
                return;
            }
            this.updateNodeState(currentNode, NodeStatus.RUNNING);
          };
    
          const onDone = () => {
            this.updateNodeState(currentNode, NodeStatus.DONE);
            const reachableNodes = this.findReachableNodes(currentNode.id);
            for (let reachableNode of reachableNodes) {
              this.updateNodeState(reachableNode, NodeStatus.ACTIVE);
            }
            this.previousNodeID = currentNode.id;

            const existsInTerminalNodes = this.terminalNodes.some(node => node.nodeID === currentNode.id);
            if (existsInTerminalNodes) {
              for (let node of this.nodes) {
                if (node.id !== this.startingNode.nodeID) {
                  this.updateNodeState(node, NodeStatus.INACTIVE);
                }
              }
            }
          };
    
          const onFailed = () => {
            this.updateNodeState(currentNode, NodeStatus.FAILED);
            const reachableNodes = this.findReachableNodes(currentNode.id);
            for (let reachableNode of reachableNodes) {
              this.updateNodeState(reachableNode, NodeStatus.ACTIVE);
            }
            this.previousNodeID = currentNode.id;
          };
    
          const onTimeout = () => {
            this.updateNodeState(currentNode, NodeStatus.TIMEOUT);
            const reachableNodes = this.findReachableNodes(currentNode.id);
            for (let reachableNode of reachableNodes) {
              this.updateNodeState(reachableNode, NodeStatus.ACTIVE);
            }
            this.previousNodeID = currentNode.id;
          };
    
          // Call checkAsyncRequestStatus with the current state passed to onRunning
          this.checkAsyncRequestStatus(reqID, undefined, onRunning, onDone, onFailed, onTimeout);
        });
      });
    }, 250);
    
    forkJoin({
      fsm: this.getApplicationFSM(),
      currentStateName: this.fsmGetCurrentState()
    }).subscribe({
      next: ({fsm, currentStateName}) => {
        let inputEdges = fsm.edges.map(edge => {
          const inputEdge: InputEdge = {
            id: edge.trigger,
            sourceId: edge.sourceID,
            targetId: edge.targetID
          }
          return inputEdge;
        });

        let inputNodes = fsm.nodes.map(node => {
          const inputNode: InputNode<nodeData> = {
            id: node.id,
            data: {
              name: node.name,
              state: NodeStatus.INACTIVE,
              description: node.description
            }
          }
          return inputNode;
        });

        if (inputNodes.length === 1) {
          this.openErrorDialog("Impossibile caricare l'FSM.");
          this.isLoading = false;
          return;
        }

        inputNodes = inputNodes.filter(node => node.id !== "init");
        const startingEdge = inputEdges.find(edge => edge.sourceId === "init");
        const startingNodeIndex = inputNodes.findIndex(node => node.id === startingEdge.targetId);
        const startingNode = inputNodes[startingNodeIndex];
        const startTrigger = startingEdge.id;
        const temp = inputNodes[0];
        inputNodes[0] = startingNode;
        inputNodes[startingNodeIndex] = temp;

        inputEdges = inputEdges.filter(edge => edge.sourceId !== "init");
        console.log(inputEdges);
        inputEdges.forEach(edge => {
          if (edge.targetId === "init") {
            edge.targetId = startingNode.id;
            const terminalNode = {nodeID: edge.sourceId, restartTrigger: edge.id};
            this.terminalNodes.push(terminalNode);
          }
        });

        this.nodes = inputNodes;
        this.edges = inputEdges;
        this.startingNode = {nodeID: startingNode.id, startTrigger: startTrigger};

        const terminalNode = this.terminalNodes.find(node => node.nodeID === currentStateName);
        if (currentStateName === "init") {

          let startingNode = this.getNodeByID(this.startingNode.nodeID);
          startingNode.data.state = NodeStatus.ACTIVE;
          this.currentNodeID = "init";
          this.isLoading = false;

        } else if (terminalNode) {
          this.fsmRunStep(terminalNode.restartTrigger).subscribe(reqID => {
            const onDoneRestart = () => {
              this.isLoading = false;
              this.currentNodeID = "init";
              const startingNode = this.getNodeByID(this.startingNode.nodeID);
              this.updateNodeState(startingNode, NodeStatus.ACTIVE);
            }
            this.checkAsyncRequestStatus(reqID, undefined, undefined, onDoneRestart);
          });
        } else {
          this.currentNodeID = currentStateName;
          const reachableNodes = this.findReachableNodes(currentStateName);
          for (let node of reachableNodes) {
            node.data.state = NodeStatus.ACTIVE;
          }
          this.isLoading = false;
        }

      },
      error: () => {
        this.openErrorDialog("Impossibile caricare l'FSM.");
        this.isLoading = false;
      }
    });

  }

  // Stop polling when the component is destroyed
  ngOnDestroy() {
    if (this.pollingInterval) {
      clearInterval(this.pollingInterval); // Clear the interval to prevent memory leaks
      console.log("Polling stopped");
    }
  }

  isEdgeActive(edge: InputEdge) {
    const targetNode = this.getNodeByID(edge.targetId);
    const sourceNode = this.getNodeByID(edge.sourceId);
    //return sourceNode.data.state !== NodeStatus.INACTIVE && targetNode.data.state === NodeStatus.ACTIVE;
    return (sourceNode.data.state !== NodeStatus.INACTIVE && targetNode.data.state === NodeStatus.ACTIVE) || (sourceNode.data.state == NodeStatus.DONE)
  }

  onNodeClick(selectedNode: InputNode<nodeData>) {
    if (selectedNode.data.state === NodeStatus.ACTIVE) {
      this.runStep(selectedNode);
    }
  }

  private runStep(selectedNode: InputNode<nodeData>) {
    let trigger: string;
    
    const terminalNode = this.terminalNodes.find(node => node.nodeID === this.currentNodeID);
    if(terminalNode){
      this.fsmRunStep(terminalNode.restartTrigger).subscribe();
    }
    
    if (selectedNode.id === this.startingNode.nodeID) {
      trigger = this.startingNode.startTrigger;
    } else {
      const selectedEdge = this.edges.find(edge => edge.sourceId === this.currentNodeID && edge.targetId === selectedNode.id);
      trigger = selectedEdge.id;
    }
    //this.currentNodeID = selectedNode.id;
    this.fsmRunStep(trigger).subscribe();
  }

  private updateNodeState(nodeToUpdate: InputNode<nodeData>, updatedState: NodeStatus) {
    this.nodes = this.nodes.map(node => {
      if (node.id === nodeToUpdate.id) {
        return {id: node.id, data: {...node.data, state: updatedState}};
      }
      return node;
    });
  }

  private getNodeByID(nodeID: string): InputNode<nodeData> {
    return this.nodes.find(node => node.id === nodeID);
  }

  private findReachableNodes(nodeID: string): InputNode<nodeData>[] {
    let reachableNodes = [];
    this.edges.forEach(edge => {
      if (edge.sourceId === nodeID) {
        const reachableNode = this.getNodeByID(edge.targetId);
        reachableNodes.push(reachableNode);
      }
    })
    return reachableNodes;
  }

  openErrorDialog(errorMessage: string) {
    this.errorMessage = errorMessage;
    this.showErrorDialog = true;
  }

  closeErrorDialog() {
    this.errorMessage = "";
    this.showErrorDialog = false;
  }

  protected readonly NodeStatus = NodeStatus;

}