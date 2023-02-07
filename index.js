const express = require("express");

const app = express();
const PORT = process.env.PORT || 3000;

const sequelize = require('./config/connection');

app.get("/", (req, res) => {
    res.send("Hello!");
})

sequelize.sync({force:false}).then(function() {
    app.listen(PORT, function() {
        console.log('App listening on PORT ' + PORT);
    });
});