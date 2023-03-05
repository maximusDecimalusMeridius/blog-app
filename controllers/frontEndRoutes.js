const express = require("express");
const Blog = require("../models/Blog");
const User = require("../models/User");
const router = express.Router();
const sequelize = require('../config/connection');

router.get("/", async (req, res) => {
    try {   
        let allBlogs = await Blog.findAll({
            include: [User],
            order: [
                ["id", "DESC"]
            ]
        });
        allBlogs = allBlogs.map(blog => blog.toJSON());
        
        for(let i = 0; i < allBlogs.length; i++){
            allBlogs[i].formattedDate = allBlogs[i].createdAt.toLocaleDateString("en-us");
            console.log(allBlogs[i]);
        }

        res.render("home", {
            allBlogs: allBlogs
        })
    } catch (error) {
        console.log(error);
    }
    
})

router.get("/dashboard", async (req, res) => {
    if(!req.session.userId){
        res.status(403).render("login");
        return;
    }

    try {
        let allBlogs = await Blog.findAll(
            {
            where: {
                user_id: req.session.userId
            },
            include: [User],
            order: [
                ["id", "DESC"]
            ]
        })
        allBlogs = allBlogs.map(blog => blog.toJSON());
        
        for(let i = 0; i < allBlogs.length; i++){
            allBlogs[i].formattedDate = allBlogs[i].createdAt.toLocaleDateString("en-us");
            console.log(allBlogs[i]);
        }

        res.render("dashboard", {
            allBlogs: allBlogs,
            user: req.session.username
        })
    } catch (error) {
        console.log(error);
    }
    
})

router.get("/login", (req, res) => {
    if(!req.session.userId){
        return res.render("login");
    } else {
        return res.status(403);
    }
})

//DELETE route for logout
router.get("/logout",(req,res)=>{
    req.session.destroy();
    setTimeout(() => {
        res.redirect("/");
    }, "1000")
})

module.exports = router;