const express = require("express");

const {getAllItems} = require("./items-model");

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

module.exports = router;