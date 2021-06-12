const controllers = require('./controllers')


module.exports = (app) => {
    // AUTH

    // USERS
    app.get('/api/users', controllers.UsersCtrl.get_all) // get_all
    app.post('/api/users', controllers.UsersCtrl.create) // create - {firstName, lastName, uid}
    app.delete('/api/users', controllers.UsersCtrl.delete) // delete - {uid, _id}

    // POSTS
    app.get('/api/posts', controllers.PostsCtrl.get_all)
    app.post('/api/posts', controllers.PostsCtrl.create)
    app.delete('/api/posts', controllers.PostsCtrl.delete)
}