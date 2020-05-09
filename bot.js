const twit = require("twit");
/*var app = require("./server.js");

//Configura a porta disponível ou a porta 3000
var server_port = process.env.YOUR_PORT || process.env.PORT || 3000;
//Configura o host disponível ou "0.0.0.0"
var server_host = process.env.YOUR_HOST || "0.0.0.0";
*/

const T = new twit({
  consumer_key: process.env.consumer_key,
  consumer_secret: process.env.consumer_secret,
  access_token: process.env.access_token,
  access_token_secret: process.env.access_token_secret,
});

function retweet() {
  let params = {
    q: "wicca surf",
    count: 10,
  };
  T.get("search/tweets", params, (err, data, response) => {
    let tweets = data.statuses;

    if (!err) {
      for (let dat of tweets) {
        let retweetId = dat.id_str;
        T.post("statuses/retweet/:id", { id: retweetId }, (err, response) => {
          if (response) console.log("Retuitado " + retweetId);
          if (err)
            console.log(
              "RT duplicado"
            );
        });
      }
    }
  });
  T.get("statuses/mentions_timeline", { count: 10 }, (err, data, response) => {
    let tweets = data.entities;
  
    if (!err) {
      for (let dat of tweets) {
        let retweetId = dat.user_mentions.id_str;
        T.post("statuses/retweet/:id", { id: retweetId }, (err, response) => {
          if (response) console.log("Retuitado mention " + retweetId);
          if (err)
            console.log(
              "RT de mention duplicado"
            );
        });
      }
    }
  });
}
setInterval(retweet, 10000);
