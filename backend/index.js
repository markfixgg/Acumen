const config = require('./config')

const db = require('./modules/database')(config.MONGO_URL)
const app = require('./app')(config.SERVER_PORT)