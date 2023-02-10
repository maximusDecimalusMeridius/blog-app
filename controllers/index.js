const express = require("express");
const router = express.Router();

const blogRoutes = require("./blogRoutes");
router.use("/blogs", blogRoutes);

module.exports = router;