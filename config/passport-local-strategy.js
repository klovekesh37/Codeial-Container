const passport=require("passport");
const LocalStrategy=require("passport-local").Strategy;
const User=require("../models/user");

//authentication using password

passport.use(new LocalStrategy({usernameField:'email'},async function(email,password,done){
    try{
        const user = await User.findOne({email:email});
        if(!user|| user.password!=password){
            console.log("invailed username or password");
            return done(null,false);
        }

        return done(null,user);

    }
    catch(err){
        console.log(`Error in finding user ${err}`);
        return done(err);
    }
}
))

//serilizing the user to decide which key to kept in the cokkies
passport.serializeUser(function(user,done){
    done(null,user.id);
})

//deserilizing the user from the key in cokkies
passport.deserializeUser(async function(id,done){
    try{
        const user = await User.findById(id);
        return done(null,user);

    }
    catch(err){
        console.log(`Error in finding user ${err}`);
        return done(err);
    }
})

