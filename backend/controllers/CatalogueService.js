var db = require('../db/index.js');

// The CatalogueService will only return ArsenalTV and ChelseaTV if the locationID is LONDON.
// The CatalogueService will only return LiverpoolTV if the locationID is LIVERPOOL.
// The CatalogueService will always return Sky News and Sky Sports News.
exports.register = function(server) {
    server.route({
        method: 'GET',
        path  : '/api/v1/services/catalogue',
        config: {
            tags       : [ 'api', 'services', 'CatalogueService' ],
            description: 'Returns list of products depending on the customer’s location.',
            handler(request, reply) {
                db.getProducts(request.query.locationID, function(err, results) {
                    reply(err || results);
                });
            }
        }
    });
};
