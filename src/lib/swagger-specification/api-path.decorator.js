"use strict";
exports.__esModule = true;
function ApiPath(path) {
    console.log(path);
    return function (target, propertyKey, descriptor) {
        console.log(target);
        console.log(propertyKey);
        console.log(descriptor);
    };
}
exports.ApiPath = ApiPath;
