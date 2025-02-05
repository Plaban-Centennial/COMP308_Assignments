const mongoose = require('mongoose');
const Game = mongoose.model('Game');
const User = require('mongoose').model('User');

//
function getErrorMessage(err) {
    if (err.errors) {
        for (let errName in err.errors) {
            if (err.errors[errName].message) return err.errors[errName].
                message;
        }
    } else {
        return 'Unknown server error';
    }
};
//

//
exports.create = function (req, res) {
    const game = new Game();
    game.title = req.body.title;
    game.genre = req.body.genre;
    game.platform = req.body.platform;
    game.releaseYear = req.body.releaseYear;
    game.developer = req.body.developer;
    game.rating = req.body.rating;
    game.description = req.body.description;
    //article.creator = req.body.username;
    console.log(req.body)
    //
    //
    User.findOne({username: req.body.username}, (err, user) => {

        if (err) { return getErrorMessage(err); }
        //
        req.id = user._id;
        console.log('user._id',req.id);

	
    }).then( function () 
    {
        article.creator = req.id
        console.log('req.user._id',req.id);

        article.save((err) => {
            if (err) {
                console.log('error', getErrorMessage(err))

                return res.status(400).send({
                    message: getErrorMessage(err)
                });
            } else {
                res.status(200).json(article);
            }
        });
    
    });
};
//

//
exports.list = function (req, res) {
    Game.find().sort('-releaseYear').populate('title', 'genre developer releaseYear platform rating').exec((err, games) => {
if (err) {
        return res.status(400).send({
            message: getErrorMessage(err)
        });
    } else {
        res.status(200).json(games);
    }
});
};
//

//
exports.gameByID = function (req, res, next, id) {
    Game.findById(id).populate('title', 'genre developer releaseYear platform rating').exec((err, game) => {if (err) return next(err);
    if (!game) return next(new Error('Failed to load game '
            + id));
        req.game = game;
        console.log('in gameByID:', req.game)
        next();
    });
};
//

//
exports.read = function (req, res) {
    res.status(200).json(req.game);
};
//

exports.update = function (req, res) {
    console.log('in update:', req.game)
    const game = req.game;
    game.title = req.body.title;
    game.genre = req.body.genre;
    game.platform = req.body.platform;
    game.releaseYear = req.body.releaseYear;
    game.developer = req.body.developer;
    game.rating = req.body.rating;
    game.description = req.body.description;
    game.save((err) => {
        if (err) {
            return res.status(400).send({
                message: getErrorMessage(err)
            });
        } else {
            res.status(200).json(article);
        }
    });
};
//

//
exports.delete = function (req, res) {
    const game = req.game;
    game.remove((err) => {
        if (err) {
            return res.status(400).send({
                message: getErrorMessage(err)
            });
        } else {
            res.status(200).json(game);
        }
    });
};
//The hasAuthorization() middleware uses the req.article and req.user objects
//to verify that the current user is the creator of the current article
exports.hasAuthorization = function (req, res, next) {
    console.log('in hasAuthorization - creator: ',req.game.creator)
    console.log('in hasAuthorization - user: ',req.id)
    //console.log('in hasAuthorization - user: ',req.user._id)


    if (req.article.creator.id !== req.id) {
        return res.status(403).send({
            message: 'User is not authorized'
        });
    }
    next();
};