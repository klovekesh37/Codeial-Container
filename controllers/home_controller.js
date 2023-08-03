const User= require("../models/user");

console.log("Home Controller loaded");

module.exports.home=function(req,res){
    console.log("Sedning to main page");
    res.render("home",{ layout: false })
}