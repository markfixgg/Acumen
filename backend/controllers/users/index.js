const Users = require('../../models/Users')

class UsersCtrl {
    async get_all(req, res) {
        const users = await Users.find();
        res.send({success: true, users})
    }

    async get_by_uid(req, res) {
        const {uid} = req.params;
        if(!uid) return res.send({success: false, error: "Missing UID!"})
        const user = await Users.findOne({uid})

        res.send({success: true, user})
    }

    async update(req, res) {
        const {update} = req.body;
        const uid = req.authId;
        if(!update || !uid) return res.send({success: false, error: 'Missing credentials!'})
        
        await Users.findOneAndUpdate({uid}, update)

        res.send({success: true})
    }

    async delete(req, res) {
        const {uid, _id} = req.body;
        if(!uid && !_id) return res.send({success: false, error: 'Missing credentials!'})

        if(_id) await Users.findByIdAndDelete(_id)
        else await Users.findOneAndDelete({uid})

        res.send({success: true})
    }

    async create(req, res) {
        const {uid, firstName, lastName, photoURL} = req.body;
        if(!uid || !firstName || !lastName) return res.send({success: false, error: 'Missing credentials!'})

        const check_exist = await Users.findOne({uid});
        if(check_exist) return res.send({success: false, error: 'User already exist!'})

        const new_user = new Users({
            firstName,
            lastName,
            uid,
            photo_url: photoURL ? photoURL : null
        })

        await new_user.save()

        res.send({success: true, new_user})
    }


    async upload_image(req, res) {
        const {buffer} = req.file;
        const {authId} = req;
        if(!buffer || !authId) return res.send({success: false, error: "Missing credentials"})

        await Users.findOneAndUpdate({uid: authId}, {image: buffer});
        res.send({success: true})
    }
}

module.exports = new UsersCtrl()