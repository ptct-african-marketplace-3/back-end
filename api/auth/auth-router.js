const express = require("express");
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const users = require("./auth-model");

router.post("/register", (req, res) =>{
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
