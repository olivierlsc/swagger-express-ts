"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
var inversify_1 = require("inversify");
var inversify_express_utils_1 = require("inversify-express-utils");
var swagger_specification_1 = require("../lib/swagger-specification");
var pkg = require("../../package.json");
var VersionController = (function () {
    function VersionController() {
    }
    VersionController.prototype.get = function (request, response, next) {
        response.json({
            description: pkg.description,
            name: pkg.name,
            version: pkg.version
        });
    };
    VersionController.TARGET_NAME = "VersionController";
    __decorate([
        swagger_specification_1.ApiGet({
            description: "Version object that need to be added",
            summary: "Add a new Version"
        }),
        inversify_express_utils_1.httpGet("/")
    ], VersionController.prototype, "get");
    VersionController = __decorate([
        swagger_specification_1.ApiPath("/"),
        inversify_express_utils_1.controller("/"),
        inversify_1.injectable()
    ], VersionController);
    return VersionController;
}());
exports.VersionController = VersionController;
