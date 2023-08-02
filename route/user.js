const express=require("express");

const router=express.Router();

const userContoller=require("../controllers/user_controller");

router.get('/sign-in',userContoller.signin);

router.get('/signup',userContoller.signup);

router.get('/create',userContoller.create);

module.exports=router;

