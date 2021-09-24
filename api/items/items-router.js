const express = require("express");

const {
    getAllItems,
    getItemByItemId,
    getOwnerItems,
    addItem,
    updateById,
    deleteById
} = require("./items-model");

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

router.get("/owner/:ownerId", async (req, res) => {
    const items = await getOwnerItems(req.params.ownerId);

    try{
        if(!items){
            res.status(404).json({
                status: "Faile",
                message: `No items found for user with ID of ${req.params.ownerId}`
            })
        }else{
            res.json({
                status: "Success",
                items: items
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

router.delete("/:itemId", async (req, res) => {
    try{
        const response = await deleteById(req.params.itemId);
        res.json({
            status: "Success",
            message: response
        })
    }catch(err){
        res.status(500).json({
            status: "Failed",
            error: err.message,
            stack: err.stack
        })
    }
})

module.exports = router;