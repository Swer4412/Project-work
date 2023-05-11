exports.routes = (app, client, database) => {

    //INCLUDO LE ROUTES

    const userRoutes = require('./routes/users')
    const mediaRoutes = require('./routes/media')
    const loginRoute = require('./login')

    //INIZIALIZZO LE ROUTES

    userRoutes.users(app, client, database)
    mediaRoutes.media(app, client, database)
    loginRoute.login(app, client, database)
}