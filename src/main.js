"use strict";
exports.__esModule = true;
var bodyParser = require("body-parser");
require("reflect-metadata");
var inversify_1 = require("inversify");
var inversify_express_utils_1 = require("inversify-express-utils");
var config = require("../config.json");
var version_controller_1 = require("./version/version.controller");
var compression = require("compression");
var helmet = require("helmet");
// set up container
var container = new inversify_1.Container();
// note that you *must* bind your controllers to Controller
container.bind(inversify_express_utils_1.TYPE.Controller)
    .to(version_controller_1.VersionController).whenTargetNamed(version_controller_1.VersionController.TARGET_NAME);
// container.bind<FooService>('FooService').to(FooService);
// create server
var server = new inversify_express_utils_1.InversifyExpressServer(container);
server.setConfig(function (app) {
    // add body parser
    app.use(bodyParser.urlencoded({
        extended: true
    }));
    app.use(bodyParser.json());
    app.use(compression());
    app.use(helmet());
});
server.setErrorConfig(function (app) {
    app.use(function (err, request, response, next) {
        console.error(err.stack);
        response.status(500).send("Something broke!");
    });
});
var app = server.build();
app.listen(config.port);
console.info("Server is listening on port : " + config.port);
