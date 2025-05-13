import {Application} from "../../../types/Application";

export type GetApplicationsResponse = applicationResponse[]

interface applicationResponse{
  name:string,
  url:string
}

