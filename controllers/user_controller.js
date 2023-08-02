const User=require("../models/user");

module.exports.signin=function(req,res){

    res.render("user_sign_up",{'title':'SingUp Page'});
}

module.exports.signup=function(req,res){

}

module.exports.create=function(req,res){
    res.send("Create page");
}