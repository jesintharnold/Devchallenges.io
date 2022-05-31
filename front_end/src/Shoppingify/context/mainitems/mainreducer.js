import { GET_ITEMS_LIST } from "../shoppingactions";

export const MainitemReducer=(state,action)=>{
switch(action.type){
  case GET_ITEMS_LIST:
    return {items:[action.payload]};
  default:
    return state;  
}
};