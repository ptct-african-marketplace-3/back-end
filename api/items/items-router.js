const express = require("express");

const {
    getAllItems,
    getItemByItemId,
    addItem,
    updateById
} = require("./items-model");
const restricted = require("../middleware/restricted")

const router = express.Router();


router.get("/", async (req, res) => {

    try{
        const items = await getAllItems();
        res.json(items) 
    } catch(err){
      res.status(500).json({
          error: err,
          message: "server error"
      })
    } 
});

router.get("/:itemId", async (req, res) => {
    const item = await getItemByItemId(req.params)
    try{
        if(!item){
            res.status(404).json({
                message: `No item with ID of ${req.params} exists`
            })
        }else{
            res.status(200).json({
                status: "Success",
                item: item
            })
        }
    }catch(err){
        res.status(500).json({
            status: "Failed",
            message: "Something went wrong.",
            error: err.message
        })
    }
})

router.post("/", async (req, res) => {
    try{
        const createdItem = await addItem(req.body)

        if(!createdItem){
            res.status(404).json({
                status: "Failed",
                error: err.message
            })
        }else{
            res.status(200).json({
                status: "Success",
                item: createdItem
            })
        }
    }catch(err){
        res.status(500).json({
            status: "Failed",
            error: err.message,
            stack: err.stack
        })
    }
})

router.put("/:itemId", async (req, res) => {

    try{
        const newDetails = await updateById(req.params.itemId, req.body);

        res.json({
            status: "Success",
            details: newDetails
        })
    }catch(err){
        res.status(500).json({
            status: "Failed",
            message: "Something went wrong",
            error: err.message,
            stack: err.stack
        })
    }
})

module.exports = router;