var express = require('express');
import bot from "./bot.js"
var app = express();


var server_port = process.env.YOUR_PORT || process.env.PORT || 3000;
var server_host = process.env.YOUR_HOST || "0.0.0.0";

app.listen(server_port, server_host, function () {
    console.log("App online");
});
  
app.get("/", function (req, res) {
    bot.retweet();
});

module.exports = app;