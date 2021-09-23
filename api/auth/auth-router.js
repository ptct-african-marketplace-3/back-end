const express = require("express");
const router = express.Router();

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const Auth = require("./auth-model");
const { checkForDuplicates,
  checkPayload,
  checkUsernameExists
} = require('../middleware/middleware.js');
const { restricted } = require('../middleware/restricted');

const JWT_SECRET = process.env.JWT_SECRET;


router.post("/register", checkPayload, checkForDuplicates, async(req, res) => {
  const newUser = req.body

  try{
    const hash = bcrypt.hashSync(newUser.password, 10);
    newUser.password = hash;
    const createdUser = await Auth.add(newUser);

    console.log(createdUser)

    if(!createdUser){
      res.status(500).json({
        message: "User not created"
      })
    }else{
      res.status(201).json(createdUser)
    }
  }catch(err){
    res.status(500).json({
      status: "Failed",
      message: "Failed to create user.",
      error: err.message
  })
  }
})

router.post('/login', checkPayload, checkUsernameExists, (req, res) => {
    
let { userName, password } = req.body;
 
Auth.findByUserName(userName) 
  .then((users) => { 
    if (users && bcrypt.compareSync(password, users.password)) {
      console.log("credentials are correct")
      const token = makeToken(users) 
        res.status(200).json({
            message: `Welcome ${users.userName}`,
            token: token,
            ownerId: users.ownerId 
        });
    } else {
      res.status(401).json({ message: 'Invalid Credentials' });
    }
  })
  .catch((err) => {
    res.status(500).json(err.message)
  });
});

function makeToken(users){
    const payload = {
      subject:users.ownerId,
      username:users.userName
    }
    const options = {
      expiresIn: "86400s"
    }
    return jwt.sign(payload, JWT_SECRET, options)
}  
 

module.exports = router;
