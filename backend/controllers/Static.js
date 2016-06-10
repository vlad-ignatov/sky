/**
 * Routes for the static files
 */
exports.register = function(server) {

    // Everything within the "/js" filder
    server.route({
        method : "GET",
        path   : "/js/{path*}",
        config : {
            handler: {
                directory: {
                    path   : "js",
                    listing: true,
                    index  : true
                }
            }
        }
    });

    // Everything else (except for the routes registered elsewhere) is mapped
    // to "/index.html"
    server.route({
        method : "GET",
        path   : "/{path*}",
        handler: {
            file : "index.html"
        }
    });
};
