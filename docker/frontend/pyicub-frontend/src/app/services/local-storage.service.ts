import {Injectable, numberAttribute} from '@angular/core';
import {Application} from "../types/Application";

export type DashboardConfig = {[key:string]:{x:number,y:number,enabled:boolean,cols:number,rows:number}}

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  private DASHBOARD_CONFIG_KEY = "dashboardConfig"
  constructor() { }

  public saveData(key: string, value: string) {
    localStorage.setItem(key, value);
  }

  public getData(key: string) {
    return localStorage.getItem(key)
  }
  public removeData(key: string) {
    localStorage.removeItem(key);
  }

  public clearData() {
    localStorage.clear();
  }

  public saveDashboardConfig(application:Application){
    let dashboardConfig:DashboardConfig = {}
    for(let plugin of application.plugins){
      dashboardConfig[plugin.name] = {
        x:plugin.x,
        y:plugin.y,
        cols:plugin.cols,
        rows:plugin.rows,
        enabled:plugin.enabled
      }
    }

    const dashboardConfigString = JSON.stringify(dashboardConfig)
    localStorage.setItem(`${this.DASHBOARD_CONFIG_KEY}_${application.robotName}_${application.name}`,dashboardConfigString)

  }

  public getDashboardConfig(application:Application):DashboardConfig{
    const dashboardConfigString = localStorage.getItem(`${this.DASHBOARD_CONFIG_KEY}_${application.robotName}_${application.name}`)
    if(!dashboardConfigString){
      return undefined
    }

    const dashboardConfig = JSON.parse(dashboardConfigString)
    return dashboardConfig

  }

}
