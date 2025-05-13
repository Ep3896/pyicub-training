
export interface ServiceListItem{
  name:string,
  url:string,
  signature:any
}


export interface GetApplicationsServicesResponse {
  [key: string]:ServiceListItem
}

