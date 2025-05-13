import {DashboardItem} from "./DashboardItem";
import * as string_decoder from "string_decoder";

export enum NodeStatus{
  INACTIVE = "INACTIVE",
  ACTIVE = "ACTIVE",
  RUNNING = "RUNNING",
  DONE = "DONE" ,
  FAILED = "FAILED",
  TIMEOUT = "TIMEOUT"
}

export interface FSMNode {
  id:string,
  name:string,
  description:string
}

export interface FSMEdge {
  sourceID:string,
  targetID:string,
  trigger:string
}

export class FSM implements DashboardItem{
  cols: number;
  rows: number;
  x: number;
  y: number;
  id:string;

  nodes:FSMNode[]
  edges:FSMEdge[]

  constructor(nodes:FSMNode[],edges:FSMEdge[],cols:number = 50,rows:number = 25, x:number = 0, y:number = 0) {
    this.nodes = nodes
    this.edges = edges
    this.cols = cols;
    this.rows = rows;
    this.x = x;
    this.y = y;
    this.id = 'Finite State Machine'
  }

  exportToJSON():string{
    let json:{[key:string]:string} = {};
    return "Finite State Machine"
  }

}
