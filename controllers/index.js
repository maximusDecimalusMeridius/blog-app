const express = require("express");
const router = express.Router();

const blogRoutes = require("./blogRoutes");
router.use("/blogs", blogRoutes);

const userRoutes = require("./userRoutes");
router.use("/users", userRoutes);

const frontEndRoutes = require("./frontEndRoutes");
router.use("/", frontEndRoutes);

module.exports = router;