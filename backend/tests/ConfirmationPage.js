var chai     = require('chai');
var Lab      = require('lab');
var server   = require('../index.js');
var lab      = exports.lab = Lab.script();
var describe = lab.describe;
var it       = lab.it;
var expect   = chai.expect;

var PATH = "/api/v1/order";

// Wait for the srver to start before running the tests (if this happens to be
// the first test)
lab.before(function(next) {
    if (server.info.started) {
        setImmediate(next);
    }
    else {
        server.once("start", next);
    }
});


describe('Confirmation Page: ', function() {

    it ('throws without customerID', function(next) {
        server.inject({
            url: PATH,
            method: 'POST'
        }, function(response) {
            expect(response.statusCode).to.equal(500);
            next();
        });
    });

    it ('responds with the products (because it\'s a stub)', function(next) {
        server.inject({
            url: PATH,
            method: 'POST',
            headers: {
                Cookie: "customerID=london_user"
            },
            payload: [ "a", "b" ]
        }, function(response) {
            expect(response.statusCode).to.equal(200);
            expect(response.payload).to.equal('["a","b"]');
            next();
        });
    });

});
