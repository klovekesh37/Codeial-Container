const UserModel=require("../models/user");

console.log("User COntroller loaded");

// Sign In which send page after signin button click to create-seesion using post which then send you to Profile page
module.exports.signin=function(req,res){
   
    return res.render('user_sign_in',{ layout: false })
}

//Sign Up page, which create-user via post and then send to you sign in page
module.exports.signup=function(req,res){
    console.log("Sign-up controller loaded");

    return res.render('user_sign_up',{ layout: false });
    
}

//create the user after sign up button enter
module.exports.create=function(req,res){
    
    
    console.log("data coming in request body after signUp--->create user Post");
    
    let data=req.body;
    console.log(`Data==>${data}`);

    let msg=new UserModel(data);
    console.log(`User data adding in the database ${msg}`);
    
    // save the user model data in database
    msg.save().then((doc)=>{console.log(doc)}).catch((err)=>{console.log(err)});
    
    console.log("User Added Successfully");
    
    return res.redirect("/users/sign-in");
}


//create the seesion after login button anf send you to profile page
module.exports.createSession=function(req,res){
    console.log(req.body);
    return res.render('home',{ layout: false });
}

