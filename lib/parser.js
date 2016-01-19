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