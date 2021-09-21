import { ApolloError } from "apollo-server-micro";
import jwt from "jsonwebtoken";
export const SECRETE_KEY = "encryption secrete here";
export const genToken = async (tokenContent: Object) => {
  return jwt.sign(tokenContent, SECRETE_KEY, { expiresIn: "24h" });
};

export const ifAdminToken = async (token: string) => {
  const verifiedToken = await jwt.verify(token, SECRETE_KEY);
  // @ts-ignore next line ignored by ts as role may not often exist in regular jwt verify process
  return verifiedToken.role === "admin" ? true : false;
};

// could think about how to wrap it up and used in resolvers unused
// probably could use a encapulation to simply adminOperations, need times to dig in
export const adminOnlyOpertaion = async (input: any, operation: Function) => {
  const { token } = input;
  const isAdmin = await ifAdminToken(token);
  if (isAdmin) {
    console.log("admin Control");
    return operation(input);
  } else {
    throw new ApolloError("Admin previlege required");
  }
};
