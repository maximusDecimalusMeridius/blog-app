const Blog = require("./Blog");
const User = require("./User");
const Comment = require("./Comment");

Blog.belongsTo(User, {
    foreignKey: "user_id",
    onDelete:"CASCADE"
});

User.hasMany(Blog, {
    onDelete:"CASCADE",
    as: "user_id"
});

Blog.hasMany(Comment, {
    onDelete: "CASCADE",
    as: "blog_id"
})

// User.hasMany(Comment, {
//     onDelete: "CASCADE",
//     as: "author_id"
// })

Comment.belongsTo(User, {
    onDelete: "CASCADE",
    foreignKey: "author_id"
});

Comment.belongsTo(Blog, {
    onDelete: "CASCADE",
    foreignKey: "blog_id"
});

module.exports = {
    Blog,
    User,
    Comment
};