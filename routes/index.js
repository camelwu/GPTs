const
    be = require('./backend'),
    fe = require('./frontend');

module.exports = function (app) {
    be(app)
    fe(app)
}