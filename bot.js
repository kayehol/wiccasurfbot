const twit = require('twit');
var app = require("./server.js")

//Configura a porta disponível ou a porta 3000
var server_port = process.env.YOUR_PORT || process.env.PORT || 3000;
//Configura o host disponível ou "0.0.0.0"
var server_host = process.env.YOUR_HOST || '0.0.0.0';

const T = new twit({
    consumer_key: process.env.consumer_key,
    consumer_secret: process.env.consumer_secret,
    access_token: process.env.access_token,
    access_token_secret: process.env.access_token_secret
});

app.listen(server_port, server_host, function () {
    console.log("Aplicação online.");
});

// start stream and track tweets
const stream = T.stream('statuses/filter', { track: 'wicca surf' });

// use this to log errors from requests
function responseCallback(err, data, response) {
  console.log(err);
}


// event handler


app.get("/", function (req, res) {
    stream.on('tweet', tweet => {
        // retweet
        T.post('statuses/retweet/:id', { id: tweet.id_str }, responseCallback);
      });
});