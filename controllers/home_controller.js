const User= require("../models/user");
const Post=require("../models/post");

console.log("Home Controller loaded");

module.exports.home=async function(req,res){
    console.log("You are on main page");
    
    //find the all post related to the user

    // Post.find({}).populate('user').exec(function(err,posts){
    //     if(err){
    //         console.log(err);
    //         return res.redirect('back');
    //     }

        

    // })
    
    //now use then and catch for callback function
    Post.find({}).populate('user').then((posts)=>{return  res.render("home",{ layout: false ,posts:posts});}).catch((err)=>{console.log(err)});
}