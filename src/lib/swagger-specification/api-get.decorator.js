"use strict";
exports.__esModule = true;
function ApiGet(args) {
    console.log(args);
    return function (target, propertyKey, descriptor) {
        console.log(target);
        console.log(propertyKey);
        console.log(descriptor);
    };
}
exports.ApiGet = ApiGet;
