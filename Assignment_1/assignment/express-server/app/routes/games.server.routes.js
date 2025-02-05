const users = require('../../app/controllers/users.server.controller');
const games = require('../../app/controllers/games.server.controller');
//
module.exports = function (app) {
        app.route('/api/games')
            .get(users.requiresLogin,articles.list)
            .post(users.requiresLogin, articles.create);
        //
        app.route('/api/games/:gameId')
            .get(games.read)
            .put(games.requiresLogin, games.hasAuthorization, games.
                update)
            .delete(games.requiresLogin, games.hasAuthorization, games.
                delete);
        //
        app.param('gameByID', articles.articleByID);
};
