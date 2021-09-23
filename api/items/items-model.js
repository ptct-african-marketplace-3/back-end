const db = require("../../data/dbConfig")

// const data = [
//     {
//         "itemName": "Custom Guitar",
//         "itemDescription": "Custom handmade guitar.",
//         "itemLocation": "Durban, South Africa",
//         "itemPrice": 500,
//         "itemId": 0,
//         "ownerId": 0,
//         "userName": "John Doe"
//     },
//     {
//         "itemName": "Fruit Basket",
//         "itemDescription": "Delicious fresh fruit basket.",
//         "itemLocation": "Cape Town, South Africa",
//         "itemPrice": 50,
//         "itemId": 1,
//         "ownerId": 1,
//         "userName": "Jane Doe"
//     },
//     {
//         "itemName": "Handsewn Hat",
//         "itemDescription": "100% cotton hat.",
//         "itemLocation": "Cape Town, South Africa",
//         "itemPrice": 25,
//         "itemId": 2,
//         "ownerId": 1,
//         "userName": "Jane Doe"
//     }
// ]

const getAllItems = () => {
  return db("owners as o")
  .join("items as i", "o.ownerId", "i.ownerId")
  .select("o.userName", "i.itemName", "i.itemDescription", "i.itemPrice", "i.itemId", "o.location", "o.ownerId")

}

async function getItemByItemId(itemId){
  const item = await db("items as i")
  .join("owners as o", "o.ownerId", "i.ownerId")
  .select("o.userName", "i.itemName", "i.itemDescription", "i.itemPrice", "i.itemId", "o.location", "o.ownerId")
  .where("itemId", itemId)
  .first();

  return item;
}

async function addItem(newItem){
  const [itemId] = await db("items as i").insert(newItem, "itemId")

  return getItemByItemId(itemId)
};



module.exports = {
    getAllItems,
    getItemByItemId,
    addItem
}
