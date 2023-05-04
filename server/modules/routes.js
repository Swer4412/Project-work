exports.routes = (app, client, database) => {

    //INCLUDO LE ROUTES

    const userRoutes = require('./routes/users')
    const mediaRoutes = require('./routes/media')

    //INIZIALIZZO LE ROUTES

    userRoutes.users(app, client, database)
    mediaRoutes.media(app, client, database)
}