const Users = require('../../models/Users')

class UsersCtrl {
    async get_all(req, res) {
        const users = await Users.find();
        res.send({success: true, users})
    }

    async get_by_uid(req, res) {
        const {uid} = req.params;
        if(!uid) return res.send({success: false, error: "Missing UID!"})
        const user = await Users.find({uid})

        res.send({success: true, user})
    }

    async delete(req, res) {
        const {uid, _id} = req.body;
        if(!uid && !_id) return res.send({success: false, error: 'Missing credentials!'})

        if(_id) await Users.findByIdAndDelete(_id)
        else await Users.findOneAndDelete({uid})

        res.send({success: true})
    }

    async create(req, res) {
        const {uid, firstName, lastName} = req.body;
        if(!uid || !firstName || !lastName) return res.send({success: false, error: 'Missing credentials!'})

        const new_user = new Users({
            firstName,
            lastName,
            uid
        })

        await new_user.save()

        res.send({success: true, new_user})
    }
}

module.exports = new UsersCtrl()