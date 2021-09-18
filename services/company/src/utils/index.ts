import{CompanyFilterParam} from '../types'
interface SetParamInterface {
    $set: Object;
  }
  
  //get set params by content provided
  export const getSetParam = (content: Partial<CompanyFilterParam>): any => {
    return { $set: { ...content } };
  };