/**
 * Set (create or update) a cookie.
 * @param {String} name The name of the cookie
 * @param {*} value The value of the cookie
 * @param {Number} days (optional) The cookie lifetime in days. If omitted the
 *                                 cookie is a session cookie.
 * @return {void}
 */
export function setCookie( name, value, days ) {
    if ( String(name).indexOf(";") > -1 ) {
        throw "The cookie name cannot contain ';'";
    }
    var expires = "";
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        expires = "; expires=" + date.toGMTString();
    }
    document.cookie = name + "=" + value + expires + "; path=/";
}

/**
 * Reads a cookie identified by it's name.
 * @param {String} name The name of the cookie
 * @return {String|null} The value of the cookie or null on failure
 */
export function getCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for(var i=0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1,c.length);
        }
        if (c.indexOf(nameEQ) === 0) {
            return c.substring(nameEQ.length,c.length);
        }
    }
    return null;
}

/**
 * Middleware for redux that logs every action
 */
export const logger = store => next => action => {
    if (process.env.NODE_ENV == "development") {
        console.group(action.type)
        console.info("dispatching", action)
        let result = next(action)
        console.log("next state", store.getState())
        console.groupEnd(action.type)
        return result
    }

    return next(action); // in production
}
