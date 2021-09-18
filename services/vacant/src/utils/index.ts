import { VacantFilterParam } from "../types";
interface SetParamInterface {
  $set: Object;
}

//get set params by content provided
export const getSetParam = (content: Partial<VacantFilterParam>): any => {
  return { $set: { ...content } };
};
