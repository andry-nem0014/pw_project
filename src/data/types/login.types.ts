import { ID, IResponseFields } from "./core.types";
import { ICredentials } from "./credentials.types";

export interface ILoginUser extends ID {
  username: ICredentials["username"];
  firstName: string;
  lastName: string;
  roles: string[];
  createdOn: string;
}

export interface ILoginData extends IResponseFields {
  User: ILoginUser;
}
