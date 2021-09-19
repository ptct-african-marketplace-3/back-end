const express = require("express");
const router = express.Router();

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const user = require("./auth-model");
const { checkForDuplicates,
  checkPayload,
  checkUsernameExists
} = require('../middleware/middleware.js');

const JWT_SECRET = process.env.JWT_SECRET;


router.post("/register", checkPayload, checkForDuplicates, (req, res) =>{
    let users = req.body;
    const rounds = process.env.ROUNDS || 10
    const hash = bcrypt.hashSync(users.password, rounds)
    users.password = hash;

    user.add(users).then(saved => res.status(201).json({
        message: "success",
        newUser: saved
    }))
    .catch(err => {
        res.status(500).json({
            message: "failed",
            error: err
        })
    })
})

router.post('/login', checkPayload, checkUsernameExists, (req, res) => {
    
let { username, password } = req.body;
 
user.findByUserName(username) 
  .then((users) => { 
    if (users && bcrypt.compareSync(password, users.password)) {
      console.log("credentials are correct")
      const token = makeToken(users) 
        res.status(200).json({
            message: `welcome ${users.userName}`,
            token: token
        });
    } else {
      res.status(401).json({ message: 'Invalid Credentials' });
    }
  })
  .catch((err) => {
    res.status(500).json(err)
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
