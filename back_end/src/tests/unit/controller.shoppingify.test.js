const shopcontroller=require('../../Controller/shoppingify/shoppcontroller');
const {ItemDAO,ListDAO}=require('../../DB/shoppingify/shoppingify')
const http_mocks=require("node-mocks-http");
const shoppingifyItems=require('../mockdata/shoppingify.Items.json');
const APIError=require("../../utils/APIError");
let req,res,next;
req=http_mocks.createRequest();
res=http_mocks.createResponse();
next=jest.fn();

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
  ItemDAO.getItems.mockReturnValue([]);
  await shopcontroller.getAllItems(req,res,next);
  expect(ItemDAO.getItems).toBeCalledTimes(1);
  expect(next).toHaveBeenCalledWith('new APIError({name:"ItemNotFound",message:"No Items found , Please start by adding",statusCode:400})');
});

});
