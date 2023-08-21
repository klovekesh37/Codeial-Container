const express=require("express");

const router=express.Router();

const passport=require('passport');
const userContoller=require("../controllers/user_controller");

console.log("User Router Loaded");

router.get('/signin',userContoller.signin);

router.get('/signup',userContoller.signup);

router.post('/create',userContoller.create);

router.post('/createSession',passport.authenticate('local',{failureRedirect:'/users/signin'}) ,userContoller.createSession);

router.get('/profile',userContoller.profile);
module.exports=router;

