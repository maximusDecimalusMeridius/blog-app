const express = require("express");
const Blog = require("../models/Blog");
const router = express.Router();

router.get("/", (req, res) => {
    res.render("test");
})

module.exports = router;