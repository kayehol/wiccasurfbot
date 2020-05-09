import config from "./config";
import twit from "twit";


const T = new twit(config);

// start stream and track tweets
const stream = T.stream('statuses/filter', { track: 'wicca surf' });

// use this to log errors from requests
function responseCallback(err, data, response) {
  console.log(err);
}

// event handler
stream.on('tweet', tweet => {
  // retweet
  T.post('statuses/retweet/:id', { id: tweet.id_str }, responseCallback);
});
