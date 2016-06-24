var assert             = require('chai').assert;
var EligibilityService = require("../controllers/EligibilityService.js")
var Lab                = require('lab');
var lab                = exports.lab = Lab.script();

lab.describe('EligibilityService', () => {
    [
        {
            msg: "The firs argument (account_number) must be integer > 0, " +
                 "otherwise an 'Invalid account number!' error is returened.",
            test(arg) {
                let result = EligibilityService(arg);
                assert.deepEqual(result.isBoom, true);
                assert.deepEqual(result.output.payload, {
                    "error"     : "Bad Request",
                    "message"   : "Invalid account number!",
                    "statusCode": 400
                });
            },
            tests: [
                undefined,
                null,
                0,
                -1,
                "x",
                true,
                false,
                new Date()
            ]
        }

    ].forEach(options => {
        lab.test(options.msg, done => {
            options.tests.forEach(options.test);
            done();
        });
    });

    lab.test("Passing non-array second argument throws an error", done => {
        [0, -5, true, null].forEach(arg => {
            assert.throws(() => EligibilityService(2, arg));
        })
        done();
    });

    lab.test("Skipping the second argument does not throw an error", done => {
        assert.doesNotThrow(() => EligibilityService(2));
        assert.doesNotThrow(() => EligibilityService(2, undefined));
        done();
    });

    lab.test("Passing invalid account_number results in 'Invalid account number!' error", done => {
        let result = EligibilityService(9090909);
        assert.deepEqual(result.isBoom, true);
        assert.deepEqual(result.output.payload, {
            "error"     : "Bad Request",
            "message"   : "Invalid account number!",
            "statusCode": 400
        });
        done();
    });

    lab.test("Passing valid account_number returns the expected result", done => {
        let users = [
            { account_number: 12345, eligible: true  },
            { account_number: 23456, eligible: false },
            { account_number: 34567, eligible: true  }
        ];
        users.forEach(user => {
            assert.equal(
                EligibilityService(user.account_number, users),
                user.eligible ? "CUSTOMER_ELIGIBLE" : "CUSTOMER_INELIGIBLE"
            );
        });
        done();
    });
});
