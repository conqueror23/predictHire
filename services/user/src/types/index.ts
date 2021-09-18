export enum role{
  user="user",
  admin="admin"
}
export interface UserInfo {
  _id:Object;
  companyId:Object;
  name: string;
  username: string;
  password:string;
  role: role;
}

export * from './userFilterParams'
