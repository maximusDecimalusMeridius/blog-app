const Blog = require("./Blog");
const User = require("./User");

Blog.belongsTo(User, {
    foreignKey: "user_id",
    onDelete:"CASCADE"
});

User.hasMany(Blog, {
    onDelete:"CASCADE"
});

module.exports = {
    Blog,
    User
};