const express=require('express');
const app=express();
const port=8090


app.use(express.urlencoded());

app.get("/",function(req,res){
    //console.log(res,req);
    return res.send("Hello");
})

const db=require('./config/mongoose');

app.listen(port,function(err){
    if(err){
        console.log(`Error in running express server and not able to bind the port on ${port} and Error: ${err}`);
    }
    console.log(`Server is running and listening on port ${port}`);
})


