import {GET_ITEMS_LIST,
  ADD_ITEM_LIST,
  DELETE_ITEM_LIST,
  CHECK_ITEM_LIST,
  UNCHECK_ITEM_LIST,
  SET_NAME_LIST,
  LIST_STATUS_LIST} from '../shoppingactions';

//Schema - design
// {
//   items:[
//     {
//       category:"A",
//       item_name:"Curd",
//       qunantity:1
//     }
//   ],
//   status:true,
//   name:null
// }
export const shoppinglistreducer=(state,action)=>{
 
switch(action.type){
  case GET_ITEMS_LIST:
    return;
  case ADD_ITEM_LIST:
    return;
  case DELETE_ITEM_LIST:
    return;
  case CHECK_ITEM_LIST:
    return;
  case UNCHECK_ITEM_LIST:
    return;
  case SET_NAME_LIST:
    return;
  case LIST_STATUS_LIST:
    return;        
  default:
    return state; 
}
};

