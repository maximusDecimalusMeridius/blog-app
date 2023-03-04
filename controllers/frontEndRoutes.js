const express = require("express");
const Blog = require("../models/Blog");
const User = require("../models/User");
const router = express.Router();

router.get("/", (req, res) => {
    res.render("login");
})

router.get("/dashboard", async (req, res) => {
    try {
        if(!req.session.userId){
            res.status(403).render("login");
            return;
        }

        let allBlogs = await Blog.findAll({include: [User]});
        allBlogs = allBlogs.map(blog => blog.toJSON());
        console.log(allBlogs);
        res.render("dashboard", {
            allBlogs: allBlogs
        })
    } catch (error) {
        console.log(error);
    }
    
})

router.get("/home", async (req, res) => {
    
    try {
        if(!req.session.userId){
            res.status(403).render("login");
            return;
        }

        let allBlogs = await Blog.findAll(
            {
            where: {
                user_id: req.session.userId
            },
            include: [User]});
        allBlogs = allBlogs.map(blog => blog.toJSON());

        res.render("home", {
            allBlogs: allBlogs
        })
    } catch (error) {
        console.log(error);
    }
    
})

router.get("/login", (req, res) => {
    res.render("login");
})

//DELETE route for logout
router.get("/logout",(req,res)=>{
    req.session.destroy();
    setTimeout(() => {
        res.redirect("/");
    }, "1000")
})

module.exports = router;