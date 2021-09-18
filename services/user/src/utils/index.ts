import{UserFilterParam} from '../types'
interface SetParamInterface {
    $set: Object;
  }
  
  //get set params by content provided
  export const getSetParam = (content: Partial<UserFilterParam>): any => {
    return { $set: { ...content } };
  };