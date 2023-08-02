const express=require('express');
const app=express();
const port=8090

app.use(express.urlencoded());

const expressLayout=require("express-ejs-layouts");

// const sassMiddleware=require('node-sass-middleware');

app.use(expressLayout);
// console.log("1");
app.use(express.static('./assets'));
// console.log("2");
app.set('view engine','ejs');
// console.log("3");
app.set('Views','./views');
// console.log("4");
app.set('layout extractStyles',true);
app.set('layout extractScripts', true);
// app.get("/",function(req,res){
//     //console.log(res,req);
//     return res.send("Hello");
// })
console.log("5");
app.use('/',require("./route/index"));

const db=require('./config/mongoose');



app.listen(port,function(err){
    if(err){
        console.log(`Error in running express server and not able to bind the port on ${port} and Error: ${err}`);
    }
    console.log(`Server is running and listening on port ${port}`);
})


