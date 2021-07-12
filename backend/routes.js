const {checkIfAuthenticated} = require('./modules/auth')
const controllers = require('./controllers')
const multer = require('multer')

const upload = multer({
    // dest: 'images',
    limits: {
        fileSize: 1000000
    },
    fileFilter(req, file, cb) {
        if (!file.originalname.match(/\.(png|jpg|jpeg)$/)){
            cb(new Error('Please upload an image.'))
        }
        cb(undefined, true)
    }
})


module.exports = (app) => {
    // AUTH

    // USERS
    app.get('/api/users', checkIfAuthenticated, controllers.UsersCtrl.get_all) // get_all
    app.get('/api/users/:uid', checkIfAuthenticated, controllers.UsersCtrl.get_by_uid) // get_by_uid - {uid}
    app.patch('/api/users', checkIfAuthenticated, controllers.UsersCtrl.update) // update - {update}
    app.post('/api/users/image',  checkIfAuthenticated, upload.single('image'), controllers.UsersCtrl.upload_image)
    app.post('/api/users', controllers.UsersCtrl.create) // create - {firstName, lastName, uid}
    app.delete('/api/users', checkIfAuthenticated, controllers.UsersCtrl.delete) // delete - {uid, _id}

    // POSTS
    app.get('/api/posts', controllers.PostsCtrl.get_all)
    app.post('/api/posts', controllers.PostsCtrl.create)
    app.delete('/api/posts', controllers.PostsCtrl.delete)

    // UPLOADS
    // TODO: find file storage (firebase, cloudinary, e.t.c)
    app.get('/api/uploads', checkIfAuthenticated, controllers.UploadsCtrl.get) // !id === all, id
    app.delete('/api/uploads', controllers.UploadsCtrl.delete) // video id
    app.post('/api/uploads', controllers.UploadsCtrl.upload) // multer video buffer
}