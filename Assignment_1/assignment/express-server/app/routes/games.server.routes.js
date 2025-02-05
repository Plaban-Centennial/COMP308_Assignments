const users = require('../../app/controllers/users.server.controller');
const games = require('../../app/controllers/games.server.controller');
//
module.exports = function (app) {
    app.route('/api/games')
        .get(games.list)
        .post(games.create);
    //
    app.route('/api/games/:gameId')
        .get(games.read)
        .put(users.requiresLogin, games.hasAuthorization, games.update)
        .delete(users.requiresLogin, games.hasAuthorization, games.
            delete);
    //
    app.param('gameId', games.gameByID);
    
};
