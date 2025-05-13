import {Application} from "./Application";
export class Robot{
  name:string
  url:URL
  applications:Application[]
  selectedApplication:Application

  constructor(name:string,url:URL,applications:Application[] = [],selectedApplication:Application = undefined) {
    this.name = name;
    this.url = url;
    this.applications = applications;
    this.selectedApplication = selectedApplication;
  }

}
