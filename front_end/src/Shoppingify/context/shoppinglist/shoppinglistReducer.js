import {GET_ITEMS_LIST,
  ADD_ITEM_LIST,
  DELETE_ITEM_LIST,
  CHECK_ITEM_LIST,
  UNCHECK_ITEM_LIST,
  SET_NAME_LIST,
  LIST_STATUS_LIST} from '../dispatchactions';

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
    //fetch and place it
    return;
  case ADD_ITEM_LIST:
    //cross-check with category and value , if exists ++ else add new
    return;
  case DELETE_ITEM_LIST:
    //cross-check with category and value , if exists -- else add new
    return;
  case CHECK_ITEM_LIST:
    //cross-check with category and value and make check as true/false
    return;
  case UNCHECK_ITEM_LIST:
    //cross-check with category and value and make check as true/false
    return;
  case SET_NAME_LIST:
    //set name to the list by default it is null
    return;
  case LIST_STATUS_LIST:
    // Set status as active|true(completed)|false(cancelled)  
    return;        
  default:
    return state; 
}
};

