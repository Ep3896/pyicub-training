import { Injectable } from '@angular/core';
import {Application} from "../types/Application";
import {DashboardConfig} from "./local-storage.service";

@Injectable({
  providedIn: 'root'
})
export class SessionStorageService {

  private SELECTED_ROBOT_KEY = "selectedRobot";
  private SELECTED_APPLICATION_KEY = "selectedApplication";

  public saveData(key: string, value: string) {
    sessionStorage.setItem(key, value);
  }

  public getData(key: string) {
    return sessionStorage.getItem(key)
  }
  public removeData(key: string) {
    sessionStorage.removeItem(key);
  }

  public clearData() {
    sessionStorage.clear();
  }

  public saveSelectedRobot(robotName:string){
    sessionStorage.setItem(this.SELECTED_ROBOT_KEY,robotName)
}

public getSelectedRobot(){
    return sessionStorage.getItem(this.SELECTED_ROBOT_KEY)
}

public saveSelectedApplication(applicationName:string){
    return sessionStorage.setItem(this.SELECTED_APPLICATION_KEY,applicationName)
}

public saveApplicationArgs(robotName:string,applicationName:string,args){
    const argsString = JSON.stringify(args)
    sessionStorage.setItem(`${robotName}_${applicationName}_ARGS`,argsString)
}

public saveIsApplicationConfigured(robotName:string,applicationName:string,isConfigured:boolean){
    sessionStorage.setItem(`${robotName}_${applicationName}_ISCONFIGURED`, isConfigured ? "true" : "false")
}

public getIsApplicationConfigured(robotName:string,applicationName:string):boolean{
  const isConfiguredString = sessionStorage.getItem(`${robotName}_${applicationName}_ISCONFIGURED`);
  return isConfiguredString === "true"
}

public getApplicationArgs(robotName:string,applicationName:string):DashboardConfig{
  const argsString = sessionStorage.getItem(`${robotName}_${applicationName}_ARGS`)

  if(!argsString){
    return undefined
  }

  const args = JSON.parse(argsString)
  return args

}

public getSelectedApplication(){
    return sessionStorage.getItem(this.SELECTED_APPLICATION_KEY)
}

}
