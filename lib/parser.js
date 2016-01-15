/**
 * Created by RAN on 25/12/2015.
 */

module.exports = {
    toJSON: toJSON,
    toSTR: toSTR
};

function toJSON (str){
    return JSON.parse(str);
}

function toSTR (json){
    return JSON.stringify(json);
}
