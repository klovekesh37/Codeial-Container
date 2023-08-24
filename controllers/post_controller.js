const User=require('../models/user');
const Post=require('../models/post');

module.exports.create=function(req,res){
    console.log("Post data coming after creating the post button");
          
    console.log("Post beofre Adding Successfully");  
    console.log(req.body.content);

    var postData=new Post({
        content:req.body.content,
        user:req.user._id
    });
    console.log(`Before adding to db postData is ${postData}`);

    postData.save({
        content:req.body.content,
        user:req.user._id
    }).then((doc)=>{console.log(doc)}).catch((err)=>{console.log(err)});

    console.log("Post added succesfully");
    return res.redirect('back');
}