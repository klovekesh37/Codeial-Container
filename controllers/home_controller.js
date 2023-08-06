const User= require("../models/user");

console.log("Home Controller loaded");

module.exports.home=function(req,res){
    console.log("Sedning to main page");
    
    res.render("home",{ layout: false })
}

module.exports.test=function(req,res){
    console.log("Test api is added to testing");
    return res.status(200).send("Yes the test endpoint worked");
}