class UploadsCtrl{
    constructor(){

    }

    async get(req, res) {
        res.status(200).send({success: true})
    }

    async delete(req, res) {
        res.status(200).send({success: true})
    }

    async upload(req, res) {
        res.status(200).send({success: true})
    }

    async prepare(req, res) {
        res.status(200).send({success: true})
    }
}

module.exports = new UploadsCtrl()