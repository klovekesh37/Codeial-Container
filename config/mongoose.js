// const mongoose=require('mongoose');
// mongoose.connect('mongodb://0.0.0.0/UsersInfo');

// const db=mongoose.connection;

// db.on('error',console.error.bind(console,"Error in connecting"));

// db.once('open',function(){
//     console.log("DataBase connected successfully");
// })

// module.exports=db;

var Db = require('mongodb').Db,
    MongoClient = require('mongodb').MongoClient;

// Enable command monitoring for debugging
const client = new MongoClient('mongodb://localhost:27017', { monitorCommands: true });

client.on('commandStarted', started => console.log(started));
client.db().collection('pets');

console.log('DB connected');