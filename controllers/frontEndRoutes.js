const express = require("express");
const {Blog, User, Comment} = require("../models");
const router = express.Router();
const sequelize = require('../config/connection');

router.get("/", async (req, res) => {
    try {   
        let allBlogs = await Blog.findAll({
            include: [
                { model: User},
                { model: Comment, as: "comments"}
            ],
            order: [
                ["id", "DESC"]
            ]
        });
        allBlogs = allBlogs.map(blog => blog.toJSON());
        console.log(allBlogs);
        for(let i = 0; i < allBlogs.length; i++){
            allBlogs[i].formattedDate = allBlogs[i].createdAt.toLocaleDateString("en-us");
            for(let j = 0; j < allBlogs[i].comments.length; j++){
                allBlogs[i].comments[j].formattedDate = allBlogs[i].comments[j].createdAt.toLocaleDateString("en-us");
                allBlogs[i].comments[j].formattedTime = allBlogs[i].comments[j].createdAt.toLocaleTimeString("en-us", {
                    hour12: false,
                    hour: "2-digit",
                    minute: "2-digit"
                });
            }
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
            include: [
                { model: User},
                { model: Comment, as: "comments"}
            ],
            order: [
                ["id", "DESC"]
            ]
        })
        allBlogs = allBlogs.map(blog => blog.toJSON());
        
        for(let i = 0; i < allBlogs.length; i++){
            allBlogs[i].formattedDate = allBlogs[i].createdAt.toLocaleDateString("en-us");
            for(let j = 0; j < allBlogs[i].comments.length; j++){
                allBlogs[i].comments[j].formattedDate = allBlogs[i].comments[j].createdAt.toLocaleDateString("en-us");
                allBlogs[i].comments[j].formattedTime = allBlogs[i].comments[j].createdAt.toLocaleTimeString("en-us", {
                    hour12: false,
                    hour: "2-digit",
                    minute: "2-digit"
                });
            }
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