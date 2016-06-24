var Boom = require("boom");

var USERS = [
    { account_number: 12345, eligible: true  },
    { account_number: 23456, eligible: false },
    { account_number: 34567, eligible: true  }
];

// EligibilityService
// -----------------------------------------------------------------------------
// EligibilityService which accepts the account
// number as an input. You are required to provide a mock or stub of the EligibilityService interface.
/*
The following table describes the EligibiityService output and the expected result:

EligibilityService                 output Description RewardsService result

CUSTOMER_ELIGIBLE                  Customer is eligible Return relevant rewards according to the customer's portfolio
CUSTOMER_INELIGIBLE                Customer is not eligible Return no rewards
Technical failure exception        Service technical failure Return no rewards
Invalid account number exception   The supplied account number is invalid Return no rewards and notify the client that the account number is invalid

 */

function EligibilityService(account_number, users=USERS) {
    // Sometimes :)
    // if (process.env.NODE_ENV == "test") {
    //     return Boom.badRequest("Technical failure");
    // }

    // 1. Validate the account number
    var user = users.find(_user => _user.account_number == account_number);
    if (!user) {
        return Boom.badRequest(`Invalid account number!`);
    }

    // 2. Customer is not eligible Return no rewards
    if (!user.eligible) {
        return "CUSTOMER_INELIGIBLE";
    }

    // 3. If the customer is eligible Return relevant rewards according to the
    // customer's portfolio
    return "CUSTOMER_ELIGIBLE";
}

module.exports = EligibilityService;
