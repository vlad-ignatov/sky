var chai     = require('chai');
var Lab      = require('lab');
var server   = require('../index.js');
var lab      = exports.lab = Lab.script();
var describe = lab.describe;
var it       = lab.it;
var expect   = chai.expect;

var SERVICE_PATH = "/api/v1/services/catalogue";

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


describe('Catalogue Service: ', function() {

    it ('works correctly without locationID', function(next) {
        server.inject(SERVICE_PATH, function(response) {
            expect(response.statusCode).to.equal(200);
            expect(JSON.parse(response.payload)).to.deep.equal([
                { category: "News"  , product: "Sky News"        , locationID: null },
                { category: "News"  , product: "Sky Sports News" , locationID: null }
            ]);
            next();
        });
    });

    it ('works correctly for LONDON', function(next) {
        server.inject(SERVICE_PATH + "?locationID=LONDON", function(response) {
            expect(response.statusCode).to.equal(200);
            expect(JSON.parse(response.payload)).to.deep.equal([
                { category: "Sports", product: "Arsenal TV"     , locationID: "LONDON" },
                { category: "Sports", product: "Chelsea TV"     , locationID: "LONDON" },
                { category: "News"  , product: "Sky News"       , locationID: null     },
                { category: "News"  , product: "Sky Sports News", locationID: null     }
            ]);
            next();
        });
    });

    it ('works correctly for LIVERPOOL', function(next) {
        server.inject(SERVICE_PATH + "?locationID=LIVERPOOL", function(response) {
            expect(response.statusCode).to.equal(200);
            expect(JSON.parse(response.payload)).to.deep.equal([
                { category: "Sports", product: "Liverpool TV"   , locationID: "LIVERPOOL" },
                { category: "News"  , product: "Sky News"       , locationID: null        },
                { category: "News"  , product: "Sky Sports News", locationID: null        }
            ]);
            next();
        });
    });

});
