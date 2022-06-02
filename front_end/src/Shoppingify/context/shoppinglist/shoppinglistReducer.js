import {GET_ITEMS_LIST,
  ADD_ITEM_LIST,
  DELETE_ITEM_LIST,
  CHECK_ITEM_LIST,
  SET_NAME_LIST,
  LIST_STATUS_LIST,LOADING} from '../dispatchactions';

//Schema - design

// {
//   items:[
//     {
//       category:"Fruit and vegetables",
//       categoryID:"xxxxxxxxxx",
//       items:[
//         {name:"Avocodo",quantity:5,itemID:"xxxxx",checked:false},
//         {name:"Avocodo bell",quantity:5,itemID:"xxxxx",checked:false},
//         {name:"Avocodo Laptop",quantity:5,itemID:"xxxxx",checked:false}
//         ]
//       }
//   ],
//   listStatus:00001000,
//   listName:null,
//   loading:true
// }



export const shoppinglistreducer=(state,action)=>{
 
switch(action.type){
  case GET_ITEMS_LIST:
    //fetch and place it
    return {...action.payload};
  case ADD_ITEM_LIST:
    //cross-check with category and value , if exists ++ else add new
     
    let category_exist=state.items.find(({categoryID})=>categoryID==action.payload.categoryID);
    let item_exist=category_exist.find(({itemID})=>itemID==action.payload.itemID);
     
    if(category_exist){
      if(item_exist){
        return {...state,items:state.items.map((el)=>(el.categoryID===action.payload.categoryID)?
            {...el,items:el.items.map((iel)=>(iel.itemID===action.payload.itemID)?iel.quantity+=1:iel)}
            :el)}
      }else{
        return {...state,items:state.items.map((el)=>(el.categoryID===action.payload.categoryID)?
          {...el,items:[...el.items,{
            name:action.payload.name,
            quantity:1,
            itemID:action.payload.itemID,
            checked:false
          }]}
          :el)}
      }
    }else{
        return {...state,items:[...state.items,{
          category:action.payload.category,
          categoryID:action.payload.categoryID,
          items:[
            {name:action.payload.name,quantity:1,itemID:action.payload.itemID,checked:false}
            ]
          }
        ]}
      }

  case DELETE_ITEM_LIST:
    //cross-check with category and value get the count , if exists -- else add new

    let item_cnt=state.items.filter(({categoryID})=>categoryID===action.payload.categoryID)[0].items.length;
    if(item_cnt===1){
      return {...state,items:state.items.filter(({categoryID})=>categoryID!==action.payload.categoryID)}
    }else{
      return {...state,items:state.items.map((el)=>(el.categoryID===action.payload.categoryID)?
        {...el,items:el.items.filter(({itemID})=>itemID!==action.payload.itemID)}
        :el)}
    }

  case CHECK_ITEM_LIST:
    //cross-check with category and value and make check as true/false
    return {...state,items:state.items.map((el)=>(el.categoryID===action.payload.categoryID)?
      {...el,items:el.items.map((iel)=>(iel.itemID===action.payload.itemID)?iel.checked=action.payload.checked:iel)}
      :el)};

  case SET_NAME_LIST:
    //set name to the list by default it is null
    return {...state,listName:action.payload.name};
  case LIST_STATUS_LIST:
    // Set status as active|true(completed)|false(cancelled)  
    return {...state,listStatus:action.payload.status};  
  case LOADING:
    return {...state,loading:action.payload.loading};        
  default:
    return state; 
}
};

