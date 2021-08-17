const {isValidObjectId} = require("mongoose");
const Posts = require("../../models/Posts");
const Users = require("../../models/Users");
const Commentaries = require("../../models/Commentaries");


class CommentariesCtrl {
    async createNewComment(req, res) {
        try {
            const {postId, userId, text} = req.body;
            // Validate input data
            if (!postId) return res.send({success: false, error: 'Missing postId field!'})
            if (!userId) return res.send({success: false, error: 'Missing userId field!'})
            if (!text) return res.send({success: false, error: 'Missing text field!'})

            // Validate ObjectIds
            // if (!isValidObjectId(postId) || !isValidObjectId(userId)) return res.send({
            //     success: false,
            //     error: 'ObjectId is not valid!'
            // });

            // Check if objectIds valid
            let post = await Posts.findById({postId});
            if (!post) return res.send({success: false, error: `Post with id: ${postId} not found!`})

            let user = await Users.findById({userId});
            if (!user) return res.send({success: false, error: `User with id: ${userId} not found!`})

            // Create new commentary
            let commentary = await Commentaries.create({
                text,
                createdBy: user._id,
                timestamp: new Date.now()
            })

            // Add ref in post to new commentary
            let updatedPost = await Posts.findByIdAndUpdate(postId, {
                activity: {
                    $push: {
                        commentaries: commentary._id
                    }
                }
            })

            // Send response with new post data
            res.send({success: true, message: "Commentary successfully created!", post: updatedPost})
        } catch (e) {
            res.status(500).send({success: false, error: e.message})
        }
    }

    async deleteComment(req, res) {
        try {
            const {postId, commentId} = req.body;
            // Validate input data
            if (!postId) return res.send({success: false, error: 'Missing postId field!'})
            if (!commentId) return res.send({success: false, error: 'Missing commentId field!'})

            // Check if post and commentary exist's
            let post = await Posts.findById(postId);
            if (!post) return res.send({success: false, error: `Post with id: ${postId} not found!`})

            let comment = await Commentaries.findById(commentId);
            if (!comment) return res.send({success: false, error: `Comment with id: ${commentId} not found!`})

            // Delete ref from post
            await Posts.findByIdAndUpdate(postId, {
                activity: {
                    $pullAll: {
                        commentaries: commentId
                    }
                }
            });

            // Delete commentary from collection
            await Commentaries.findByIdAndRemove(commentId);

            // Send response o_O
            res.send({success: true, message: 'Commentary successfully deleted!'})
        } catch (e) {
            res.status(500).send({success: false, error: e.message})
        }
    }

    async updateComment(req, res) {
        try {
            // Get input data
            const {commentId, text} = req.body;
            if (!commentId) return res.send({success: false, error: 'Missing commentId field!'})
            if (!text) return res.send({success: false, error: 'Missing text field!'})

            // Check if objecId is valid
            if (!isValidObjectId(commentId)) return res.send({success: false, error: 'ObjectId is not valid!'});

            // Update commentary text
            await Commentaries.findByIdAndUpdate(commentId, {text});

            // Send response o_O
            res.send({success: true})
        } catch (e) {
            res.status(500).send({success: false, error: e.message})
        }
    }

}

module.exports = new CommentariesCtrl();