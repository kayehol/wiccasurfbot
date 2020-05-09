const config = require("./config");
const twit = require("twit");


const T = new twit(config);

const params = {
    q: 'wicca surf',
    count: 10
}

T.get('search/tweets', params,  (err, data, res) => {
    if(!err){
        for(let i=0; i < data.statuses.length; i++){
            let tweetID = {id: data.statuses[i].id_str}
            T.post('statuses/retweet', tweetID, (err, res) => {
                if(!err){
                    console.log(`Retweet successful`)
                }else{
                    console.log(err.message)
                }
            })
        }
    }else{
        console.log(err)
    }
})
