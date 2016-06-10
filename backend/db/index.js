var sqlite3 = require('sqlite3').verbose();
var debug   = require('debug');

// Note that DB is practically a singleton private instance
var DB = new sqlite3.Database(__dirname + "/db.sqlite");

var log = debug('app:db');
var dbg = debug('app:db:error');
dbg.log = console.error.bind(console);

// Log SQL queries if enabled
DB.on('trace', function(sql) {
    log(sql);
});

// wrap callbacks with a function that will log errors to STDERR if the DEBUG
// env var is set to something like "app:db", "app:*", "*"...
function createCallback(fn) {
    return function(error, result) {
        if (error) {
            dbg(error);
        }
        fn(error, result)
    };
}

module.exports = {

    /**
     * Should fetch products that match the given locationID or that don't have
     * locationID specified.
     * @param  {String}   locationID
     * @param  {Function} callback error-first callback. If there is no error,
     *                             the second argument should be an array with
     *                             0 or more objects representing the selected
     *                             rows.
     * @return {void}
     */
    getProducts(locationID, callback) {
        DB.all(
            "SELECT products.name AS product, " +
            "       categories.name AS category, " +
            "       locations.name AS locationID " +
            "FROM products " +
            "    LEFT JOIN categories ON (categories.id = products.category_id) " +
            "    LEFT JOIN locations ON (locations.id = products.location_id) " +
            "WHERE locations.name = ? OR products.location_id ISNULL",
            [ locationID ],
            createCallback(callback)
        );
    },

    /**
     * Should fetch the locationID for the given customerID.
     * @param  {String}   customerID
     * @param  {Function} callback error-first callback. If there is no error,
     *                             the second argument should be an object like
     *                             { "locationID": "whatever" }. IIf there is no
     *                             match the value will be undefined.
     * @return {void}
     */
    getLocationID(customerID, callback) {
        DB.get(
            "SELECT name AS locationID FROM locations WHERE locations.id IN ( " +
            "    SELECT locationID FROM customers WHERE customerID = ? " +
            ")",
            [ customerID ],
            createCallback(callback)
        );
    }
};
