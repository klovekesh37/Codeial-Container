const express=require("express");

const router=express.Router();

const userContoller=require("../controllers/user_controller");

console.log("User Router Loaded");

router.get('/sign-in',userContoller.signin);

router.get('/sign-up',userContoller.signup);

router.post('/create',userContoller.create);

router.post('/createSession', userContoller.createSession);

module.exports=router;

