const shopcontroller=require('../../Controller/shoppingify/shoppcontroller');
const {ItemDAO,ListDAO}=require('../../DB/shoppingify/shoppingify')
const http_mocks=require("node-mocks-http");
const shoppingifyItems=require('../mockdata/shoppingify.Items.json');
const shoppingifycategory=require('../mockdata/shoppingify.category.json');
const shoppingifycart=require("../mockdata/shoppingify.cart.json");
const shoppingifyhistory=require("../mockdata/shoppingify.history.json");
const shoppingifyhistoryview=require('../mockdata/shoppingify.historyview.json');
const shoppingifyitemview=require('../mockdata/shoppingify.Itemoverview.json');
const shoppingifyanalytics=require('../mockdata/shoppingify.analytics.json');

const APIError=require("../../utils/APIError");
let req,res,next;


beforeEach(()=>{
  req=http_mocks.createRequest();
  res=http_mocks.createResponse();
  next=jest.fn();
});


//clearing values before executing

describe("shoppingify.getAllItems", () => {
  ItemDAO.getItems=jest.fn();

 test("getAllItems function is defined",()=>{
  expect(typeof shopcontroller.getAllItems).toBe('function');
 }); 

 test("getAllItems return value",async()=>{
  ItemDAO.getItems.mockReturnValue(shoppingifyItems);
  await shopcontroller.getAllItems(req,res,next);
  expect(ItemDAO.getItems).toBeCalledTimes(1);
  expect(res.statusCode).toBe(200);
  expect(res._getJSONData()).toStrictEqual({data:shoppingifyItems});
});

test("getAllItems return empty []",async()=>{
  ItemDAO.getItems.mockClear();
  ItemDAO.getItems.mockReturnValue([]);
  await shopcontroller.getAllItems(req,res,next);
  expect(ItemDAO.getItems).toBeCalledTimes(1);
  expect(next).toHaveBeenCalledWith(new APIError({name:"ItemNotFound",message:"No Items found , Please start by adding",statusCode:400}));
});
});

describe("shoppingify.getAllCategory", () => {
  ItemDAO.getCategory=jest.fn();

 test("getAllCategory function is defined",()=>{
  expect(typeof shopcontroller.getAllCategory).toBe('function');
 }); 

 test("getAllCategory return value",async()=>{
  ItemDAO.getCategory.mockReturnValue(shoppingifycategory);
  await shopcontroller.getAllCategory(req,res,next);
  expect(ItemDAO.getCategory).toBeCalledTimes(1);
  expect(res.statusCode).toBe(200);
  console.log(res._getData());
  expect(res._getJSONData()).toStrictEqual({data:shoppingifycategory});
});

test("getAllCategory return empty []",async()=>{
  ItemDAO.getCategory.mockClear();
  ItemDAO.getCategory.mockReturnValue([]);
  await shopcontroller.getAllCategory(req,res,next);
  expect(ItemDAO.getCategory).toBeCalledTimes(1);
  expect(next).toHaveBeenCalledWith(new APIError({name:"ItemNotFound",message:"No Items found , Please start by adding",statusCode:400}));
});

});

describe("shoppingify.addshopItem",()=>{
  ItemDAO.addItem=jest.fn();
  test("getAllCategory function is defined",()=>{
    expect(typeof shopcontroller.addshopItem).toBe('function');
  });

  test("AddshopItem function payload response",async ()=>{
    req.body={
      name:"Chicken Noodles",
      description:null,
      imageurl:null,
      categoryname:"Non-veg",
      categoryID:null,
      userID:"619a5bd0a01ef280b3b92bd4"
    };
    const ret_val={
      item:"Chicken Noodles",
      itemID:"619a5bd0a01ef280b3b92bd4",
      imageurl:null,
      description:null
    };
    ItemDAO.addItem.mockReturnValue(ret_val);
    await shopcontroller.addshopItem(req,res,next);  
    expect(ItemDAO.addItem).toBeCalledTimes(1);
    expect(res.statusCode).toBe(201); 
    expect(res._getJSONData()).toStrictEqual({data:ret_val});
  });

  test("AddshopItem function Wrong payload response",async ()=>{
    req.body={
      name:null,
      description:null,
      imageurl:null,
      categoryname:"Non-veg",
      categoryID:null,
      userID:"619a5bd0a01ef280b3b92bd4"
    };
    await shopcontroller.addshopItem(req,res,next);  
    expect(next).toHaveBeenCalledWith(expect.objectContaining(/^ValidationError:$/));
  });
});

describe("shoppingify.getshopList",()=>{
  ListDAO.getList=jest.fn();
  test("getshopList function is defined",()=>{
    expect(typeof shopcontroller.getshopList).toBe('function');
  });

  test("getshopList function payload response",async ()=>{
    req.body={userID:"619a5bd0a01ef280b3b92bd4"};
    ListDAO.getList.mockReturnValue(shoppingifycart);
    await shopcontroller.getshopList(req,res,next);  
    expect(ListDAO.getList).toBeCalledTimes(1);
    expect(res.statusCode).toBe(200); 
    expect(res._getJSONData()).toStrictEqual({data:shoppingifycart});
  });

  test("getshopList function response  [] ",async ()=>{
    req.body={userID:"619a5bd0a01ef280b3b92bd4"};
    ListDAO.getList.mockReturnValue([]);
    ListDAO.getList.mockClear();
    await shopcontroller.getshopList(req,res,next);  
    expect(ListDAO.getList).toBeCalledTimes(1);
    expect(next).toHaveBeenCalledWith(new APIError({name:"ItemNotFound",message:"No Items found , Please start by adding",statusCode:400}));
  });

  test("AddshopItem function wrong payload ",async ()=>{
    req.body={userID:null};
    await shopcontroller.getshopList(req,res,next);  
    expect(next).toHaveBeenCalledWith(expect.objectContaining(/^ValidationError:$/));
  });
});

describe("shoppingify.postshopList",()=>{
  ListDAO.postList=jest.fn();
  test("postshopList function is defined",()=>{
    expect(typeof shopcontroller.postshopList).toBe('function');
  });

  test("postshopList function payload response",async ()=>{
    req.body={
"cartID":"62c87baaab16d4122b22090b",
"listname":"Jesinth",
"status":"Active",
"list":[
 {
    "categoryID": "62c5a5695e01727e88737640",
    "category": "VEGAN-2000",
    "items": [
        {
        "item": "GOAT",
        "itemID": "62c5a5695e01727e8873763f",
        "quantity": 1,
        "checked": false
        },
        {
        "item": "ICE-TEA",
        "itemID": "62c5aebd680e8d45de99dab1",
        "quantity": 3,
        "checked": true
        }
    ]
}
]
};
    ListDAO.postList.mockReturnValue({cartID:"62c87baaab16d4122b22090b",update:true});
    await shopcontroller.postshopList(req,res,next);  
    expect(ListDAO.postList).toBeCalledTimes(1);
    expect(res.statusCode).toBe(201); 
    expect(res._getJSONData()).toStrictEqual({data:{cartID:"62c87baaab16d4122b22090b",update:true}});
  });

  test("postshopList function wrong payload ",async ()=>{
    req.body={userID:null};
    await shopcontroller.postshopList(req,res,next);  
    expect(next).toHaveBeenCalledWith(expect.objectContaining(/^ValidationError:$/));
  });
});

describe("shoppingify.historyshopList",()=>{
  ListDAO.history=jest.fn();
  test("historyshopList function is defined",()=>{
    expect(typeof shopcontroller.historyshopList).toBe('function');
  });

  test("historyshopList function payload response",async ()=>{
    req.body={userID:"619a5bd0a01ef280b3b92bd4"};
    ListDAO.history.mockReturnValue(shoppingifyhistory);
    await shopcontroller.historyshopList(req,res,next);  
    expect(ListDAO.history).toBeCalledTimes(1);
    expect(res.statusCode).toBe(200); 
    expect(res._getJSONData()).toStrictEqual({data:shoppingifyhistory});
  });

  test("historyshopList function response  [] ",async ()=>{
    req.body={userID:"619a5bd0a01ef280b3b92bd4"};
    ListDAO.history.mockReturnValue([]);
    ListDAO.history.mockClear();
    await shopcontroller.historyshopList(req,res,next);  
    expect(ListDAO.history).toBeCalledTimes(1);
    expect(next).toHaveBeenCalledWith(new APIError({name:"ItemNotFound",message:"No History found , Please start by changing status",statusCode:400}));
  });

  test("AddshopItem function wrong payload ",async ()=>{
    req.body={userID:null};
    await shopcontroller.historyshopList(req,res,next);  
    expect(next).toHaveBeenCalledWith(expect.objectContaining(/^ValidationError:$/));
  });
});

describe("shoppingify.historyviewshopList",()=>{
  ListDAO.historyView=jest.fn();
  test("historyviewshopList function is defined",()=>{
    expect(typeof shopcontroller.historyviewshopList).toBe('function');
  });

  test("historyviewshopList function payload response",async ()=>{
    req.params={historyid:"619a5bd0a01ef280b3b92bd4"};
    ListDAO.historyView.mockReturnValue(shoppingifyhistoryview);
    await shopcontroller.historyviewshopList(req,res,next);  
    expect(ListDAO.historyView).toBeCalledTimes(1);
    expect(res.statusCode).toBe(200); 
    expect(res._getJSONData()).toStrictEqual({data:shoppingifyhistoryview});
  });

  test("historyviewshopList function response  [] ",async ()=>{
    req.params={historyid:"619a5bd0a01ef280b3b92bd4"};
    ListDAO.historyView.mockReturnValue([]);
    ListDAO.historyView.mockClear();
    await shopcontroller.historyviewshopList(req,res,next);  
    expect(ListDAO.historyView).toBeCalledTimes(1);
    expect(next).toHaveBeenCalledWith(new APIError({name:"ItemNotFound",message:"Unable to Retrive items for the HistoryID mentioned",statusCode:400}));
  });

  test("AddshopItem function wrong payload ",async ()=>{
    req.params={userID:null};
    await shopcontroller.historyviewshopList(req,res,next);  
    expect(next).toHaveBeenCalledWith(expect.objectContaining(/^ValidationError:$/));
  });
});

describe("shoppingify.itemOverview",()=>{
  ItemDAO.itemOverview=jest.fn();
  test("itemOverview function is defined",()=>{
    expect(typeof shopcontroller.itemOverview).toBe('function');
  });

  test("itemOverview function payload response",async ()=>{
    req.body={"categoryID":"62c5a5695e01727e88737640","itemID":"62c5a5695e01727e8873763f"};
    ItemDAO.itemOverview.mockReturnValue(shoppingifyitemview);
    await shopcontroller.itemOverview(req,res,next);  
    expect(ItemDAO.itemOverview).toBeCalledTimes(1);
    expect(res.statusCode).toBe(200); 
    expect(res._getJSONData()).toStrictEqual({data:shoppingifyitemview});
  });

  test("itemOverview function response  [] ",async ()=>{
    req.body={"categoryID":"62c5a5695e01727e88737640","itemID":"62c5a5695e01727e8873763f"};
    ItemDAO.itemOverview.mockReturnValue([]);
    ItemDAO.itemOverview.mockClear();
    await shopcontroller.itemOverview(req,res,next);  
    expect(ItemDAO.itemOverview).toBeCalledTimes(1);
    expect(next).toHaveBeenCalledWith(new APIError({name:"ItemNotFound",message:"Unable to Retrive items for the Item and Category mentioned",statusCode:400}));
  });

  test("AddshopItem function wrong payload ",async ()=>{
    req.body={"categoryID":null,"itemID":"62c5a5695e01727e8873763f"};
    await shopcontroller.itemOverview(req,res,next);  
    expect(next).toHaveBeenCalledWith(expect.objectContaining(/^ValidationError:$/));
  });
});

describe("shoppingify.listanalytics",()=>{
  ListDAO.topitems=jest.fn();
  ListDAO.topcategory=jest.fn();
  ListDAO.graphanalytics=jest.fn();

  test("listanalytics function is defined",()=>{
    expect(typeof shopcontroller.listanalytics).toBe('function');
  });

  test("listanalytics function payload response",async ()=>{
    req.body={userID:"619a5bd0a01ef280b3b92bd4"};
    ListDAO.topitems.mockReturnValue(shoppingifyanalytics.items);
    ListDAO.topcategory.mockReturnValue(shoppingifyanalytics.category);
    ListDAO.graphanalytics.mockReturnValue(shoppingifyanalytics.graph);

    await shopcontroller.listanalytics(req,res,next);  
    expect(ListDAO.topitems).toBeCalledTimes(1);
    expect(ListDAO.topcategory).toBeCalledTimes(1);
    expect(ListDAO.graphanalytics).toBeCalledTimes(1);
    expect(res.statusCode).toBe(200); 
    expect(res._getJSONData()).toStrictEqual(shoppingifyanalytics);
  });

  test("listanalytics function response  [] ",async ()=>{
    req.body={userID:"619a5bd0a01ef280b3b92bd4"};
    ListDAO.topitems.mockReturnValue([]);
    ListDAO.topcategory.mockReturnValue([]);
    ListDAO.graphanalytics.mockReturnValue([]);
  
    ListDAO.topitems.mockClear();
    ListDAO.topcategory.mockClear();
    ListDAO.graphanalytics.mockClear();

    await shopcontroller.listanalytics(req,res,next);  
    expect(ListDAO.topitems).toBeCalledTimes(1);
    expect(ListDAO.topcategory).toBeCalledTimes(1);
    expect(ListDAO.graphanalytics).toBeCalledTimes(1);
    expect(next).toHaveBeenCalledWith(new APIError({name:"ItemNotFound",message:"Unable to Retrive items for the Item and Category mentioned",statusCode:400}));
  });

  test("AddshopItem function wrong payload ",async ()=>{
    req.body={userID:null};
    await shopcontroller.listanalytics(req,res,next);  
    expect(next).toHaveBeenCalledWith(expect.objectContaining(/^ValidationError:$/));
  });
});