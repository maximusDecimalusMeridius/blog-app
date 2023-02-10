//loop in dependencies
const express = require("express");
const Blog = require("../models/Blog");
const router = express.Router();

//GET all records
router.get("/", (req, res) => {
    Blog.findAll().then(data => {
        res.json(data);
    }).catch(error => {
        console.log(error);
        res.status(500).json({
            message: "Error getting records!",
            error: error
        })
    })
})

//GET one record by id
router.get("/:id", (req, res) => {
    Blog.findByPk(req.params.id)
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

//POST a new record
router.post("/", (req, res) => {
    console.log(req.session);
    Blog.create({
        title: req.body.title,
        content: req.body.content,
        user_id: req.session.user_id
    })
    .then(blogData => {
        res.json(blogData);
    })
    .catch(error => {
        res.status(500).json({
            message: "Error!",
            error: error
        })
    })
})

//UPDATE a record
router.put("/:id", (req, res) => {
    Blog.update({
        title: req.body.title,
        content: req.body.content
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
    Blog.destroy({
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