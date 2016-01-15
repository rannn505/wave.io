/**
 * Created by RAN on 25/12/2015.
 */

module.exports = RequestMethod;

/**
 *
 * @param method
 * @param uri
 * @param data
 * @param cb
 */
function RequestMethod (method,uri,data,reswaiter,cb){
    return {
        "method": method,
        "uri": uri,
        "data": data,
        "reswaiter":reswaiter,
        "cb": cb
    };
}
