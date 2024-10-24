const User = require("../models/user.jsx");
const Like = require("../models/likes.jsx");
const Images = require("../models/Images.jsx");



  exports.like = async(req,res)=>{
    const {postId} = req.body
    if(!postId){
        throw new error("post not found");
    }
    const {user} = req.user._id;
    const liked = await Like.find({
        postId,
        user
    });
    if (liked.length ===0){
        const likeNow = await Like.create({
            post:postId,
            likedBy:user
        })
        if(!likeNow){
            throw new error("failed to like")
        }
        return res
        .status(200)   
    }
    else{
        const disLike = await Like.findByIdAndDelete(liked._id);
        console.log(disLike);
        if (disLike) throw new error( "Unable to dislike");
        return res.status(200, {}, "Issue disliked Successfully");
    }

  }

