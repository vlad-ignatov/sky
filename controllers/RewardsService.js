var EligibilityService = require("./EligibilityService.js");
var Boom               = require("boom");

// RewardsService
// -----------------------------------------------------------------------------
// The service accepts as input a customer account number and a portfolio containing channels
// subscriptions. If the customer is eligible for rewards the RewardsService should return a list of all the
// rewards available according to the subscriptions on the portfolio.

var REWARDS = {
    SPORTS: "CHAMPIONS_LEAGUE_FINAL_TICKET",
    KIDS  : "",
    MUSIC : "KARAOKE_PRO_MICROPHONE",
    NEWS  : "",
    MOVIES: "PIRATES_OF_THE_CARIBBEAN_COLLECTION"
};

function uInt(x, defaultValue = 0) {
    var out = parseInt(x, 10);
    if (isNaN(x) || !isFinite(x) || x < 0) {
        return uInt(defaultValue);
    }
    return out;
}

exports.register = function(server) {
    server.route({
        path: "/rewards",
        method: "GET",
        handler(request, reply) {
            var id = uInt(request.query.account_number);

            if (id === 0) {
                return reply(Boom.badRequest("Invalid ID"));
            }

            var subscriptions = String(request.query.subscriptions || "").split(/\s*,\s*/);
            var check         = EligibilityService(id);
            var out           = [];

            if ("CUSTOMER_INELIGIBLE" == check) {
                return reply(out);
            }

            if ("CUSTOMER_ELIGIBLE" == check) {
                subscriptions.forEach(sub => {
                    var reward = REWARDS[sub];
                    if (reward) {
                        out.push(reward);
                    }
                });
                return reply(out);
            }

            reply(check);
        }
    });
};
