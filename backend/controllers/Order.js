/**
 * This is just a stub acting as backend for the order page. It requires that
 * customerID cookie is present and if so - replies with whatever was sent in
 * the POST body (which is expected to be JSON array).
 */
exports.register = function(server) {
    server.route({
        method: 'POST',
        path  : '/api/v1/order',
        config: {
            tags       : [ 'api' ],
            description: 'Simple echo of the POST payload. Requires customerID cookie...',
            handler(request, reply) {

                // The client is required provide a customerID. Note that
                // here we don't check if it is for valid existing user.
                if (!request.state.customerID) {
                    return reply(new Error("Missing customerID"));
                }

                // just reply with whatever we have received
                reply(request.payload || []);
            }
        }
    });
};
