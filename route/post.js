const express=require('express');
const router=express.Router();
const postController=require('../controllers/post_controller');
const passport=require('../config/passport-local-strategy');

router.post('/create',passport.checkAuthentication, postController.create);

router.get('/destroy/:id',passport.checkAuthentication, postController.destroy);

module.exports=router;