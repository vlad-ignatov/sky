var Boom = require("boom")
var db   = require('../db/index.js');

var ERR_MISSING_CUSTOMER_ID = "This service is not available for you ( missing customerID )";
var ERR_INVALID_CUSTOMER_ID = "This service is not available for you ( invalid customerID )";

exports.register = function(server) {
    server.route({
        method: 'POST',
        path  : '/api/v1/services/customer-location',
        config: {
            tags       : [ 'api', 'services', 'CustomerLocationService' ],
            description: 'The Customer Location Service will be called to get the customer’s location.',
            notes      : 'Takes the customerID from the "customerID" cookie.',
            handler(request, reply) {
                var customerID = request.state.customerID;
                if (!customerID) {
                    return reply(Boom.unauthorized(ERR_MISSING_CUSTOMER_ID));
                }

                db.getLocationID(customerID, function(err, row) {
                    if (err) {
                        // Boom will catch it and generate error 500 json response
                        return reply(err);
                    }

                    if (!row) {
                        return reply(Boom.unauthorized(ERR_INVALID_CUSTOMER_ID));
                    }

                    // Reply with an id token - we can afford to respond with
                    // plain text here which is better for performance...
                    reply(row.locationID).type("text/plain");
                })
            }
        }
    });
};
