const config=require('./config')
const twit=require('twit')

const app = require('/.server.js')
var server_port = process.env.YOUR_PORT || process.env.PORT || 3000;
var server_host = process.env.YOUR_HOST || '0.0.0.0';

const T = new twit(config)

function retweet()
{
let params={
    q:'"wicca surf"',
    count:10
}
T.get('search/tweets',params,(err,data,response)=>{
let tweets=data.statuses

if (!err)
{            
for(let dat of tweets)
{
    let retweetId = dat.id_str;
    T.post('statuses/retweet/:id', {id: retweetId},(err, response)=>
    {
    if (response) 
        console.log('Retweeted!!! '+ retweetId)
    if (err) 
        console.log('Something went wrong while RETWEETING... Duplication maybe...')
    }
    )
}
}
}
)
}

app.listen(server_port, server_host, function(){
    setInterval(retweet,10000);
});
