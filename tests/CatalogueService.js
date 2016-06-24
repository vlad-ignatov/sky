var chai     = require('chai');
var Lab      = require('lab');
var server   = require('../index.js');
var lab      = exports.lab = Lab.script();
var describe = lab.describe;
var it       = lab.it;
var expect   = chai.expect;

var RewardsServicePath     = "/rewards";

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


describe('RewardsService: ', function() {

    it ('Invalid ID parameter', function(next) {
        server.inject(`${RewardsServicePath}?account_number=whatever`, response => {
            expect(response.statusCode).to.equal(400);
            expect(JSON.parse(response.payload).message).to.equal("Invalid ID");
            next();
        });
    });

    it ('CUSTOMER IS INELIGIBLE', function(next) {
        server.inject(`${RewardsServicePath}?account_number=23456`, response => {
            expect(response.statusCode).to.equal(200);
            expect(JSON.parse(response.payload)).to.deep.equal([]);
            next();
        });
    });

    it ('CUSTOMER_ELIGIBLE', function(next) {
        server.inject(`${RewardsServicePath}?account_number=12345&subscriptions=SPORTS,KIDS,MUSIC`, response => {
            expect(response.statusCode).to.equal(200);
            expect(JSON.parse(response.payload)).to.deep.equal([
                "CHAMPIONS_LEAGUE_FINAL_TICKET",
                "KARAOKE_PRO_MICROPHONE"
            ]);
            next();
        });
    });

    it ('Invalid account number', function(next) {
        server.inject(`${RewardsServicePath}?account_number=1234567&subscriptions=SPORTS,KIDS,MUSIC`, response => {
            expect(response.statusCode).to.equal(400);
            expect(JSON.parse(response.payload).message).to.equal("Invalid account number!");
            next();
        });
    });

});
