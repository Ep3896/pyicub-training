interface FSMNode {
  name:string,
  description:string
}
interface FSMTransition {
  dest:string,
  source:string,
  trigger:string

}

export interface getApplicationFSMResponse{
  initial_state:string,
  name:string,
  states:FSMNode[],
  transitions:FSMTransition[],

  dest: string,
  source: string,
  trigger: string
}

