const mongoose=require('mongoose');
//mongoose.connect('mongodb://0.0.0.0:27017/UsersInfo');
mongoose.connect('mongodb://admin:password@mongodb:27017/UserInfo?directConnection=true&authSource=admin');

const db=mongoose.connection;

db.on('error',console.error.bind(console,"Error in connecting"));

db.once('open',function(){
    console.log("DataBase connected successfully");
})

module.exports=db;
