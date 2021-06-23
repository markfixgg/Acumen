const controllers = require('./controllers')


module.exports = (app) => {
    // AUTH

    // USERS
    app.get('/api/users', controllers.UsersCtrl.get_all) // get_all
    app.get('/api/users/:uid', controllers.UsersCtrl.get_by_uid) // get_by_uid - {uid}
    app.post('/api/users', controllers.UsersCtrl.create) // create - {firstName, lastName, uid}
    app.delete('/api/users', controllers.UsersCtrl.delete) // delete - {uid, _id}

    // POSTS
    app.get('/api/posts', controllers.PostsCtrl.get_all)
    app.post('/api/posts', controllers.PostsCtrl.create)
    app.delete('/api/posts', controllers.PostsCtrl.delete)

    // UPLOADS
    // TODO: find file storage (firebase, cloudinary, e.t.c)
    app.get('/api/uploads', controllers.UploadsCtrl.get) // !id === all, id
    app.delete('/api/uploads', controllers.UploadsCtrl.delete) // video id
    app.post('/api/uploads', controllers.UploadsCtrl.upload) // multer video buffer
}