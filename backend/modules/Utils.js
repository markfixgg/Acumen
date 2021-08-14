let validate = (fields, req, res) => {
    for (let field of fields) {
        if(!req.body[field]) return res.status(400).send({success: false, error: `Missing ${field} param in body!`});
    }

    return {success: true};
}


module.exports = {validate}