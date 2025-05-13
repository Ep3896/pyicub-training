import {ApplicationArgType} from "./ApplicationArgType";

export type ApplicationArgsTemplate = {
  [key:string]:{
    type:ApplicationArgType,
    value:any
  }};
