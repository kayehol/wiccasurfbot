const twit = require("twit");

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
        let nome = dat.user.screen_name;

        T.post("statuses/retweet/:id", { id: retweetId }, (err, response) => {
          if (err) {
            console.log(err.message);
          } else if (response) {
            console.log("Retuitado! id:" + retweetId + " nome: " + nome);
          }
        });
      }
    } else {
      console.log(err.message)
    }
  });
}

function retweetMention() {
  T.get("statuses/mentions_timeline", { count: 10 }, (err, data, response) => {
    if (!err) {
      for (let dat of data) {
        let retweetId = dat.id_str;
        let text = dat.text;
        T.post("statuses/retweet/:id", { id: retweetId }, (err, response) => {
          if (err) {
            console.log(err.message);
          } else if (response) {
            console.log("Retuitado mention " + retweetId + text);
          }
        });
      }
    }
  });
}

setInterval(retweet, 1800000);
setInterval(retweetMention, 1800000);