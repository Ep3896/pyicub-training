import {ICubRequestStatus} from "../../../types/ICubRequestStatus";
export interface GetRequestStatusResponse{
  "creation_time":number,
  "duration":number,
  "end_time":number,
  "exception":any,
  "req_id":string,
  "retval":any,
  "start_time":number,
  "status":ICubRequestStatus,
  "tag":string,
  "target":"string"
}
