import {GET_ITEMS_LIST,
  ADD_ITEM_LIST,
  DELETE_ITEM_LIST,
  CHECK_ITEM_LIST,
  SET_NAME_LIST,
  LIST_STATUS_LIST,LOADING,DECR_ITEM_LIST} from '../dispatchactions';

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
     
    let category_exist=state.items.filter(({categoryID})=>categoryID===action.payload.categoryID);
    
    
    if(category_exist.length>0){
      let item_exist=category_exist[0].items?.filter(({itemID})=>itemID===action.payload.itemID);
      if(item_exist!==undefined&&item_exist?.length>0){
        console.log("A");
        return {...state,items:state.items.map((el)=>(el.categoryID===action.payload.categoryID)?
            {...el,items:el.items.map((iel)=>(iel.itemID===action.payload.itemID)?{...iel,quantity:iel.quantity+1}:iel)}
            :el)}

      }else{
        console.log("B");
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
        console.log("C");
        return {...state,items:[...state.items,{
          category:action.payload.category,
          categoryID:action.payload.categoryID,
          items:[
            {name:action.payload.name,quantity:1,itemID:action.payload.itemID,checked:false}
            ]
          }
        ]
      };
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
      {...el,items:el.items.map((iel)=>(iel.itemID===action.payload.itemID)?{...iel,checked:!iel.checked}:iel)}
      :el)};


  case DECR_ITEM_LIST:
    let item_cnt_=state.items.filter(({categoryID})=>categoryID===action.payload.categoryID)[0].items.filter(({itemID})=>itemID===action.payload.itemID)[0].quantity;
    if(item_cnt_===1){
      if(state.items.filter(({categoryID})=>categoryID===action.payload.categoryID)[0].items.length===1){
        return {...state,items:state.items.filter(({categoryID})=>categoryID!==action.payload.categoryID)};
      }else{
        return {...state,items:state.items.map((el)=>(el.categoryID===action.payload.categoryID)?
          {...el,items:el.items.filter((iel)=>(iel.itemID!==action.payload.itemID))}
     :el)};
      }
    }else{
      return {...state,items:state.items.map((el)=>(el.categoryID===action.payload.categoryID)?
        {...el,items:el.items.map((iel)=>(iel.itemID===action.payload.itemID)?{...iel,quantity:iel.quantity-1}:iel)}
        :el)};
    };
    

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


