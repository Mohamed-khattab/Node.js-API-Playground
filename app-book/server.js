// here we need to setup the server 
const express = require('express');
const app = express();
const cors = require('cors');
app.use(cors());
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : false}));

// require the router 

var bookRouter = require('./router/bookRouter');




const home = '/';
app.get(home , (req , res)=>{
    res.send(' Server started successfully , i am the home');
})
const port =  3000; // when production it will be in env vars
app.listen(port, ()=>{
    console.log('Server starts ----- port : ' , port )
})

app.use("/api/v1" , bookRouter)
