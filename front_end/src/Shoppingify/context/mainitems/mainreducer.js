import { GET_ITEMS_LIST,LOADING,RENDERAGAIN} from "../dispatchactions";

export const MainitemReducer=(state,action)=>{
switch(action.type){
  case GET_ITEMS_LIST:
    return {items:[...action.payload.items],loading:action.payload.loading,RenderAgain:false};
  case LOADING:
    return {...state,loading:action.payload.loading};
  case RENDERAGAIN:
    return {...state,RenderAgain:true};  
  default:
    return state;  
}
};