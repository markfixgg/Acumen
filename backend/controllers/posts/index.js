const Posts = require('../../models/Posts')

class PostsCtrl{
    constructor() {
    }

    async get_all(req, res) {
        const posts = await Posts.find({})

        res.send({success: true, posts})
    }

    async get_by_user_id(req, res) {

    }

    async create(req, res) {
        const {title, text, media, dateCreated} = req.body;
        if(!title || !text || !dateCreated) return res.send('Missing credentials!')

        const new_post = new Posts({
            title,
            text,
            media,
            dateCreated
        })

        await new_post.save()

        res.send({success: true, new_post})
    }

    async delete(req, res) {
        const {_id} = req.body;
        if(_id) return res.send({success: false, error: 'Missing _id!'})

        await Posts.findByIdAndDelete(_id)

        res.send({success: true})
    }

}

module.exports = new PostsCtrl()