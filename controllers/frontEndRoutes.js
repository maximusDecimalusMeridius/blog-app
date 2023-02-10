const express = require("express");
const Blog = require("../models/Blog");
const router = express.Router();

router.get("/", (req, res) => {
    res.render("welcome");
})

router.get("/dashboard", (req, res) => {
    console.log(req.session);
    res.render("dashboard");
})

router.get("/login", (req, res) => {
    res.render("login");
})

//DELETE route for logout
router.get("/logout",(req,res)=>{
    req.session.destroy();
    res.send("logged out")
})

module.exports = router;