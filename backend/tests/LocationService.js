// A CustomerLocationService is available which will take the customerID as an
// input and return one of the following outputs.
//
// 1. A location identifier Customer is valid and a locationID is returned
// 2. Failure exception There was a problem retrieving the customer information
//
// 􀀀You are required to provide a stub of the CustomerLocationService interface.
var chai     = require('chai');
var Lab      = require('lab');
var server   = require('../index.js');
var lab      = exports.lab = Lab.script();
var describe = lab.describe;
var it       = lab.it;
var expect   = chai.expect;

var SERVICE_PATH = "/api/v1/services/customer-location";

// Wait for the srver to start before running the tests
lab.before(function(next) {
    if (server.info.started) {
        setImmediate(next);
    }
    else {
        server.once("start", next);
    }
});


describe('Customer Location Service: ', function() {

    // A location identifier Customer is valid and a locationID is returned
    it ('works with valid customerID and returns locationID', function(next) {
        server.inject({
            method: "POST",
            url   : SERVICE_PATH,
            headers: {
                Cookie: "customerID=london_user"
            }
        }, function(response) {
            // console.log(response)

            expect(response.statusCode).to.equal(200);
            // expect(response.headers['set-cookie']).to.deep.equal([ 'customerID=london_user' ]);
            expect(response.payload).to.equal("LONDON");
            next();
        });
    });


    // Failure exception There was a problem retrieving the customer information
    it ('returns an error for invalid customerID', function(next) {
        server.inject({
            method : 'POST',
            url    : SERVICE_PATH,
            headers: {
                Cookie: "customerID=nobody"
            }
        },
        function(response) {
            expect(response.statusCode).to.equal(401);
            next();
        });
    });

    // Failure exception There was a problem retrieving the customer information
    it ('returns an error for missing customerID', function(next) {
        server.inject({
            method : 'POST',
            url    : SERVICE_PATH
        },
        function(response) {
            expect(response.statusCode).to.equal(401);
            next();
        });
    });

});
