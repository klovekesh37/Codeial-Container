const express=require('express');
const app=express();
const port=8090

app.use(express.urlencoded());

//EJS engine used as View engine
const expressLayout=require("express-ejs-layouts");
app.set('view engine','ejs');
app.set('views','./views');
app.use(expressLayout);

// to usee CSS files in ejs or html
app.use(express.static('./assets'));

//app.set('layout extractStyles',true);
//app.set('layout extractScripts', true);

// Redirect request to the route/index 
app.use('/',require("./route/index"));


const db=require('./config/mongoose');

app.listen(port,function(err){
    if(err){
        console.log(`Error in running express server and not able to bind the port on ${port} and Error: ${err}`);
    }
    console.log(`Server is running and listening on port ${port}`);
})


