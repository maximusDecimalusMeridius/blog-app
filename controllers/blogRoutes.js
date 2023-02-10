const express = require("express");
const Blog = require("../models/Blog");
const router = express.Router();

router.get("/", (req, res) => {
    res.send("Router for blogs works!");
})

router.post("/", (req, res) => {

    Blog.create({
        user: "test",
        content: "test"
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

module.exports = router;