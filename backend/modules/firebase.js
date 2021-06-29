const admin = require('firebase-admin')
const credential = require('../config/acumen-77836-firebase-adminsdk-961cd-7ae01318de.json')

admin.initializeApp(
    {
        credential: admin.credential.cert(credential)
    }
);

module.exports = admin