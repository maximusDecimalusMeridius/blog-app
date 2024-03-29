//loop in dependencies
const express = require("express");
const Comment = require("../models/Comment");
const router = express.Router();

//GET all records
router.get("/", (req, res) => {
    Comment.findAll({
        
    }).then(data => {
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
    Comment.findByPk(req.params.id)
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
    if(!req.session.userId){
        res.status(500).json({msg: "Please login before commenting"})
        return;
    }
    console.log(req.session);
    Comment.create({
        title: req.body.title,
        content: req.body.content,
        author: req.session.username,
        author_id: req.session.userId,
        blog_id: req.body.blog_id
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
router.put("/update", (req, res) => {
    Comment.update({
        title: req.body.title,
        content: req.body.content
    },{
        where: {
            id: req.body.id
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
router.delete("/delete/:id", (req, res) => {
    if(!req.session.userId){
        return res.status(401).json( {message: "Unauthorized"} )
    }

    console.log(req);

    Comment.destroy({
        where:{
            id: req.params.id,
            author_id: req.session.userId
        }
    }).then(data=>{
        if(data){
            return res.json(data)
        } else {
            return res.status(404).json({message: "Error deleting record!"})
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