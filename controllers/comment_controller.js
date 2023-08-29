const User=require('../models/user');
const Post=require('../models/post');
const Comment=require('../models/comment');

module.exports.create=function(req,res){
    console.log(`${req.body.content} and ${req.body.post} and ${req.user._id}`);

    const commentData=Comment({
        content:req.body.content,
        post:req.body.post,
        user:req.user._id
    });



    Post.findById(req.body.post).then((post)=>{
        if(post){
            commentData.save().then((doc)=>{

                console.log(post.comments);
                post.comments=post.comments || [];
                console.log(post.comments);
                post.comments.push(doc);
                post.save();
                console.log("comment added succesfully in comment model");
            }).catch((err)=>{console.log(err)});

            

            console.log("Comment added succesfully");
            return res.redirect('back');

        }
    }).catch((err)=>{console.log(err)});

}