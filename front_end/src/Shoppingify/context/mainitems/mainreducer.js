import { GET_ITEMS_LIST,LOADING,ISMOBILE} from "../dispatchactions";

export const MainitemReducer=(state,action)=>{
switch(action.type){
  case GET_ITEMS_LIST:
    return {items:[...action.payload.items],loading:action.payload.loading,RenderAgain:false};
  case LOADING:
    return {...state,loading:action.payload.loading};
  case ISMOBILE:
    return {...state,isMobile:!state.isMobile};  
  default:
    return state;  
}
};