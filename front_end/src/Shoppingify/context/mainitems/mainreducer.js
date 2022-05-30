export const GET_ITEMS="GET_ITEMS";
export const MainitemReducer=(state,action)=>{
switch(action.type){
  case GET_ITEMS:
    return {items:[action.payload]};
  default:
    return state;  
}
};