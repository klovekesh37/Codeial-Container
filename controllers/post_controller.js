const User=require('../models/user');
const Post=require('../models/post');
const Comment=require('../models/comment');

module.exports.create=function(req,res){
    console.log("Post data coming after creating the post button");

    var postData=Post({
        content:req.body.content,
        user:req.user._id
    });

    // console.log(`Before adding to db postData is ${postData}`);
    postData.save().then((doc)=>{console.log(doc)}).catch((err)=>{console.log(err)});

    console.log("Post added succesfully");
    return res.redirect('back');
}

module.exports.destroy=function(req,res){

    //find the post by id
    Post.findById(req.params.id).then((post)=>{
        
        //check same user is deleting the post which has created
        if(post.user== req.user.id){
            post.deleteOne(post._id);
            console.log("Post deletion successfull")
            Comment.deleteMany({post:req.params.id}).then((comment)=>{
                console.log("all comments deleted associated with post");
                return res.redirect('back');
            }).catch((err)=>{
                console.log(`error in deleting the comments by post id ${err}`);
            })
        }else{
            alert('You are not authorized to delete this post');
            console.log("not same user is deleting the post");
            return res.redirect('back');
        }

    }).catch((err)=>{
        console.log(`error in finding Post by post id /destroy/:id, ${err}`);
    });
}
