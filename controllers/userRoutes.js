//loop in dependencies
const express = require("express");
const User = require("../models/User");
const router = express.Router();
const bcrypt = require("bcrypt");

//GET all records
router.get("/", (req, res) => {
    User.findAll().then(data => {
        res.json(data);
    }).catch(error => {
        console.log(error);
        res.status(500).json({
            message: "Error getting records!",
            error: error
        })
    })
})

//POST a new record
router.post("/", (req, res) => {
    User.create({
        username: req.body.username,
        password: req.body.password
    })
    .then(userData => {
        req.session.user_id = userData.id;
        req.session.user_email = userData.email;
        res.json(userData)
    })
    .catch(error => {
        res.status(500).json({
            message: "Error!",
            error: error
        })
    })
})

//POST route for login
router.post("/login",(req,res)=>{
    User.findOne({
    where:{
     username: req.body.username
    }
    }).then(userData=>{
     if(!userData){
         return res.status(401).json({msg:"incorrect email or password"})
     } else {
         if(bcrypt.compareSync(req.body.password,userData.password)){
             req.session.userId = userData.id;
             req.session.userEmail = userData.email;
             return res.json(userData)
         } else {
             return res.status(401).json({msg:"incorrect email or password"})
         }
     }
    }).catch(err=>{
     console.log(err);
     res.status(500).json({msg:"oh noes!",err})
    })
 })

 //DELETE route for logout
 router.get("/logout",(req,res)=>{
    req.session.destroy();
    res.send("logged out")
})

//GET one record by id
router.get("/:id", (req, res) => {
    User.findByPk(req.params.id)
    .then(data => {
        if(data){
           return res.json(data);
        } else {
            res.status(404).json({
                message: "No record exists!"
            })
        }
    }).catch(error => {
        console.log(error);
        res.status(500).json({
            message: "Error getting data",
            error: error
        })
    })
})

//UPDATE a record
router.put("/:id", (req, res) => {
    User.update({
        username: req.body.title,
        password: req.body.content
    },{
        where: {
            id:req.params.id
        }
    }).then(data => {
        if(data[0]){
            return res.json(data);
        } else {
            return res.status(404).json({message: "Record doesn't exist!"});
        }
    }).catch(error =>{
        console.log(error);
        res.status(500).json({
            message: "Error updating record!",
            error: error
        })
    })
})

//DELETE a record
router.delete("/:id", (req, res) => {
    User.destroy({
        where:{
            id:req.params.id
        }
    }).then(data=>{
        if(data){
            return res.json(data)
        } else {
            return res.status(404).json({message: "Record doesn't exist!"})
        }
    }).catch(error =>{
        console.log(error);
        res.status(500).json({
            message: "Error deleting record!",
            error: error
        })
    })
})

module.exports = router;