const User=require("../models/user");

console.log("User COntroller loaded");

// Sign In which send page after signin button click to create-seesion using post which then send you to Profile page
module.exports.signin=function(req,res){
    if(req.isAuthenticated()){
        return res.redirect('/users/profile');
    }
    return res.render('user_sign_in',{ layout: false })
}

//Sign Up page, which create-user via post and then send to you sign in page
module.exports.signup=function(req,res){
    console.log("Sign-up controller loaded");
    if(req.isAuthenticated()){
        return res.redirect('/users/profile');
    }
    return res.render('user_sign_up',{ layout: false });
    
}

//create the user after sign up button enter
module.exports.create=function(req,res){

    console.log("create controller loaded")
    //check password is same as confirmes password
    if(req.body.password != req.body.confmPasswd){
        console.log("password doesn't match with confirm password");
        return res.redirect('back');
    }

    console.log("data coming in request body after signUp--->create user Post");
    
    let data=req.body;
    console.log(`Data==>${data}`);

    let msg=new User(data);
    console.log(`User data adding in the database ${msg}`);
            
    // save the user model data in database
    msg.save().then((doc)=>{console.log(doc)}).catch((err)=>{console.log(err)});
            
    console.log("User Added Successfully");  
    return res.redirect("/users/signin");
}

//create the seesion after login button and send you to profile page
module.exports.createSession=async function(req,res){
    
    // //check user exist or not ..with email id
    // const user = await User.findOne({email:req.body.email});
    // if(!user){
    //     console.log("user is not defined");
    //     return;
    // }
    
    // if(user){
    //     //check entered passowrd match with db passowrd
    //     if(user.password!=req.body.password){
    //         console.log("password doesn't match");
    //         return res.redirect('back');
    //     }

    //     //handle cookie session
    //     res.cookie('user_id',user.id);
    //     return res.redirect('/users/profile');
    // }
    // else{
    //     console.log("handle user not found");
    //     return res.redirect('back')
    // }
    return res.redirect('/users/profile');
}


module.exports.profile=async function(req,res){
    
    if(req.cookies.user_id){
        console.log(req.cookies.user_id);
        const user = await User.findById(req.cookies.user_id);
        if(user){
            console.log("user is present");
            return res.render('profile',{title:"User Profile",user: user,layout: false});
        }
        else{
            console.log("user not found after cookie checkup");
            return res.redirect("/users/signin");
        }
    }
    else{
        console.log("users cookies not present");
        return res.redirect("/users/signin");
    }
}