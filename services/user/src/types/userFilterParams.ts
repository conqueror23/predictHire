import {role} from "./index"

export interface UserFilterParam{
  _id:Object;
  companyId:Object;
  name: string;
  username: string;
  password:string;
  role: role;
}
