const Posts = require('../../models/Posts')
const {validate} = require("../../modules/Utils");
const Users = require("../../models/Users");

class PostsCtrl {
    async get_all(req, res) {
        try {
            const posts = await Posts.find({})

            res.send({success: true, posts})
        } catch (e) {
            res.status(500).send({success: false, error: e.message})
        }
    }

    async create(req, res) {
        try {
            const {title, text} = req.body;
            if (!title) return res.send({success: false, error: 'Missing title of post!'})
            if (!text) return res.send({success: false, error: 'Missing title of post!'})

            const post = new Posts({
                title,
                text,
                createdAt: new Date()
            })

            await post.save()
            res.send({success: true, post})
        } catch (e) {
            res.status(500).send({success: false, error: e.message})
        }
    }

    async delete(req, res) {
        try {
            const {_id} = req.body;
            if (_id) return res.send({success: false, error: 'Missing _id!'})

            await Posts.findByIdAndDelete(_id)

            res.send({success: true})
        } catch (e) {
            res.status(500).send({success: false, error: e.message})
        }
    }

    async edit(req, res) {
        try {
            const {_id, query} = req.body;
            const {authId} = req;

            if (!_id) return res.send({success: false, error: 'Missing _id!'})
            if (!query) return res.send({success: false, error: 'Missing query!'})

            const post = await Posts.findById(_id);
            if (!post) return res.send({success: false, error: 'Post not found!'});

            const creator = await Users.findById(post.postedBy);
            if(creator.uid !== authId) return res.send({success: false, error: 'You dont have permissions to edit this post!'})

            await Posts.findByIdAndUpdate(_id, query);

            res.send({success: true})
        } catch (e) {
            res.status(500).send({success: false, error: e.message})
        }
    }
}

module.exports = new PostsCtrl()