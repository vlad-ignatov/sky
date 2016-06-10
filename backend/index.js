require('colors');

var Hapi             = require('hapi');
var requireDirectory = require('require-directory');
var debug            = require('debug');
var Util             = require('util');
var Path             = require('path');
var Inert            = require('inert');

var debugLog   = debug('app:log');
debugLog.log   = console.log.bind(console);

var ENV = process.env.NODE_ENV || "production"
var CFG = {
    connections: {
        routes: {
            files: {
                relativeTo: Path.join(__dirname, 'www/')
            },
            cors: {
                credentials: true
            }
        }
    },
    debug: ENV == "development" ? {
        log    : ['error'],
        request: ['error']
    } : false
};

var server = new Hapi.Server(CFG);

// Define the main connection
server.connection({
    port   : process.env.PORT || 3210,
    host   : process.env.HOST || "0.0.0.0",
    labels : "main"
});

// Make the server to expect and parse the "customerID" cookie
server.state('customerID', {
    isHttpOnly: false, // to read it from JS
    ignoreErrors: true, // errors are ignored and treated as missing cookies.
    path: "/"
});

server.register(Inert, function(err) {
    if (err) {
        throw err;
    }

    // Load all controllers (to extend the system just define new controllers in
    // the controllers directory)
    debugLog('Loading controllers...'.bold);
    var controllers = requireDirectory(module, __dirname + "/controllers"), ctl;
    for ( var ctlName in controllers ) {
        ctl = controllers[ctlName];
        if (typeof ctl.register == "function") {
            var msg = "• Register controller from %s/controllers/%s..."
            try {
                ctl.register(server);
                msg += ' OK'.bold.green
            } catch (ex) {
                msg += ' Failed'.bold.red
                msg += '\n' + ex.stack.red
            }
            debugLog(Util.format(msg, __dirname, ctlName).magenta);
        }
    }

    // Finally start the server
    server.start(function(error) {
        if (error) {
            throw error;
        }
        console.log(Util.format(
            "Server running at: %s %s%s".white.bold.blueBG,
            server.info.uri,
            (" PID: " + process.pid + " ").greenBG.blue,
            (" ENV: " + ENV + " ").redBG
        ));
    });

});

// export the server to make it testable
module.exports = server;
