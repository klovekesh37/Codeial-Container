const express=require('express');
const app=express();
const port = process.env.PORT || 8090;
/**
 * Passport is an authenticated middleware for Node.js and Passport.js uses a session cookie { session cookie stores all the session information plus it is encrypted }.
 * Passport uses two strategy----local and oauth(google,facebook)
 * installed the passport library and local strategy package and required them
 * Session Encrypted cookies - Automatically the user’s id will be encrypted and stored into session cookies, which can be done using a library { express-session }.
 */
//used for session cookie
const session=require("express-session");
const passport=require("passport");
const passportLocal=require("./config/passport-local-strategy");

app.use(express.urlencoded());

//For reading and writing into cookies, we will be using a library called cookie-parser.
const cookieParser=require('cookie-parser');
//to set up the cookie parser using the app
app.use(cookieParser());



/* SETTING UP THE EJS as engine */

//for using partials we use layout
const expressLayout=require("express-ejs-layouts");
////EJS engine used as View engine
app.set('view engine','ejs');
app.set('views','./views');
// set express layout for layout partial in ejs
app.use(expressLayout);

/* To set the static files location where to look into */
// tell in which foler to look for static(CSS) files in ejs or html
app.use(express.static('./assets'));

//app.set('layout extractStyles',true);
//app.set('layout extractScripts', true);

const db=require('./config/mongoose');
/**
 * add middleware that takes the session cookies and encrypts them,
 * The session cookies get reset every time the server restarts
 * Mongo Store for persistent storage and a library called connect-mongo.
 */
const MongoStore= require('connect-mongo');
app.use(session({
    name:'codeial',
    secret:'blahblah',
    saveUninitialized:false,
    resave: false,
    cookie:{
        maxAge:(1000*60*10)
    },
    store:MongoStore.create(
        {
            mongoUrl:'mongodb://admin:password@mongodb:27017/UserInfo?directConnection=true&authSource=admin',
            mogooseConnection:db,
            autoRemove:'disabled'
        }, function(err){
            console.log(err|| "conect-mongo db connection Ok");
        }
    )
}));

app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setAuthenticatedUser);
/* Redirecting Request to Route/index.js */
app.use('/',require("./route/index"));



/* Defined where server will listen and start the server*/

app.listen(port,function(err){
    if(err){
        console.log(`Error in running express server and not able to bind the port on ${port} and Error: ${err}`);
    }
    console.log(`Server is running and listening on port ${port}`);
})


