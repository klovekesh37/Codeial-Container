const express=require('express');
const app=express();
const port=8090
//For reading and writing into cookies, we will be using a library called cookie-parser.
const cookieParser=require('cookie-parser');
//to set up the cookie parser using the app
app.use(cookieParser());
app.use(express.urlencoded());

//for using partials we use layout
const expressLayout=require("express-ejs-layouts");
////EJS engine used as View engine
app.set('view engine','ejs');
app.set('views','./views');
// set express layout for layout partial in ejs
app.use(expressLayout);

// tell in which foler to look for static(CSS) files in ejs or html
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


