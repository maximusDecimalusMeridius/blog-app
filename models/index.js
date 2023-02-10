const Blog = require("./Blog");
const User = require("./User");

Blog.belongsTo(User, {
    foreignKey: "user_id",
    onDelete:"CASCADE"
});

User.hasMany(Blog, {
    foreignKey: "user_id",
});

module.exports = {
    Blog,
    User
};