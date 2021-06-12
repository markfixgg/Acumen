const Users = require('../../models/Users')

class UsersCtrl {
    async get_all(req, res) {
        const users = await Users.find();
        res.send({success: true, users})
    }

    async delete(req, res) {
        const {uid, _id} = req.body;
        if(!uid && !_id) return res.send({success: false, error: 'Missing credentials!'})

        if(_id) await Users.findByIdAndDelete(_id)
        else await Users.findOneAndDelete({uid})

        res.send({success: true})
    }

    async create(req, res) {
        const {uid, firstName, lastName, password} = req.body;
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