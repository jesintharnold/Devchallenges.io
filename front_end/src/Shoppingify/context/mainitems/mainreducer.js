import { GET_ITEMS_LIST,LOADING} from "../dispatchactions";

export const MainitemReducer=(state,action)=>{
switch(action.type){
  case GET_ITEMS_LIST:
    return {items:[...action.payload.items],loading:action.payload.loading};
  case LOADING:
    return {...state,loading:action.payload.loading};
  default:
    return state;  
}
};