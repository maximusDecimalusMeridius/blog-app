const Blog = require("./Blog");
const User = require("./User");

Blog.belongsTo(User, {
    onDelete:"CASCADE"
});

User.hasMany(Blog);

module.exports = {
    Blog,
    User
};