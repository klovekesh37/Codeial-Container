const mongoose=require('mongoose');
/*
const MONGO_USERNAME = 'admin';
const MONGO_PASSWORD = 'password';
const MONGO_HOSTNAME = 'mongodb';
const MONGO_PORT = '27017';
const MONGO_DB = 'UserInfo';
*/
// Environment field for DB connection
const {
MONGO_USERNAME,
MONGO_PASSWORD,
MONGO_HOSTNAME,
MONGO_PORT,
MONGO_DB
} = process.env;

//Options for mongodb connection
const options = {
useNewUrlParser: true,
};

const url = `mongodb://${MONGO_USERNAME}:${MONGO_PASSWORD}@${MONGO_HOSTNAME}:${MONGO_PORT}/${MONGO_DB}?directConnection=true&authSource=admin`;
//mongoose.connect('mongodb://0.0.0.0:27017/UsersInfo');
//mongoose.connect('mongodb://admin:password@mongodb:27017/UserInfo?directConnection=true&authSource=admin');
//mongoose.connect(url, {useNewUrlParser: true});

mongoose.connect(url, options).then( function() {
console.log('MongoDB is connected');
})
.catch( function(err) {
console.log(err);
});

const db=mongoose.connection;


db.on('error',console.error.bind(console,"Error in connecting"));

db.once('open',function(){
    console.log("DataBase connected successfully");
})

module.exports=db;
