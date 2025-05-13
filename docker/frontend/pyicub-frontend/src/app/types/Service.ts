import {ApplicationArgsTemplate} from "./ApplicationArgsTemplate";

export enum ServiceState {
  ACTIVE = "ACTIVE",
  INACTIVE = "INACTIVE",
  RUNNING = "RUNNING",
  DONE = "DONE",
  FAILED = "FAILED",
  TIMEOUT = "TIMEOUT"
}

export interface Service{
  name:string;
  args:any;
  argsTemplate:ApplicationArgsTemplate;
  state:ServiceState;

}

