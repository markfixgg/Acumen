const {checkIfAuthenticated} = require('./modules/auth')
const controllers = require('./controllers')
const multer = require('multer')

const upload = multer({
    // dest: 'images',
    limits: {
        fileSize: 1000000
    },
    fileFilter(req, file, cb) {
        cb(undefined, true)
    }
})

module.exports = (app) => {
    // USERS
    app.get('/api/users', checkIfAuthenticated, controllers.UsersCtrl.get_all) // Get list of all users
    app.get('/api/users/:uid', checkIfAuthenticated, controllers.UsersCtrl.get_by_uid) // Get user by uid
    app.patch('/api/users', checkIfAuthenticated, controllers.UsersCtrl.update) // Update user profile information

    app.post('/api/users', controllers.UsersCtrl.create) // Create new user, by firebase credentials
    // app.delete('/api/users', checkIfAuthenticated, controllers.UsersCtrl.delete) // Delete existing user

    // User profile image
    // TODO: change profile image from URL (frontEnd) to buffer, and load dynamically from database
    // TODO: Check if image is correct type (jpg, png)
    app.post('/api/users/image', checkIfAuthenticated, upload.single('file'), controllers.UsersCtrl.upload_image) // TODO: Check if upload new image work's correctly
    app.delete('/api/users/image', checkIfAuthenticated, controllers.UsersCtrl.delete_image) // TODO: Check if upload new image work's correctly

    // POSTS
    app.get('/api/posts', checkIfAuthenticated, controllers.PostsCtrl.get_all) // Get list of all posts
    app.post('/api/posts', checkIfAuthenticated, controllers.PostsCtrl.create) // Create new post
    app.delete('/api/posts', checkIfAuthenticated, controllers.PostsCtrl.delete) //

    // Commentaries
    // TODO: edit already existed commentary
    app.post('/api/commentaries', checkIfAuthenticated, controllers.CommentariesCtrl.createNewComment) // Add new commentary to already existing post
    app.delete('/api/commentaries', checkIfAuthenticated, controllers.CommentariesCtrl.deleteComment) // Remove already existing commentary


    // TODO: Create routes that returns: User friends posts, recomended posts

    // TODO: Create payment system, payment webhook

    // UPLOADS
    // TODO: find file storage (firebase, cloudinary, e.t.c)
    app.get('/api/uploads', checkIfAuthenticated, controllers.UploadsCtrl.get) // Get list of all existing uploads
    app.get('/api/uploads/:id', checkIfAuthenticated, controllers.UploadsCtrl.get) // Get exact upload by _id
    app.delete('/api/uploads/:id', checkIfAuthenticated, controllers.UploadsCtrl.delete) // Delete upload by _id

    app.post('/api/uploads', checkIfAuthenticated, upload.single('media'), controllers.UploadsCtrl.upload) // Upload any type of file (for video)
}
