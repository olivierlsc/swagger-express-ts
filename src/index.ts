import * as bodyParser from 'body-parser';
import * as express from 'express';
import 'reflect-metadata';
import { Container } from 'inversify';
import {
    interfaces,
    InversifyExpressServer,
    TYPE,
} from 'inversify-express-utils';
import { CarsController } from './cars/cars.controller';
import * as swagger from 'swagger-express-ts';
import { SwaggerDefinitionConstant } from 'swagger-express-ts';
const config = require('../config.json');
import { CarController } from './cars/car.controller';
import { CarBulkController } from './cars/carbulk.controller';
import { CarsService } from './cars/cars.service';
import * as _ from 'lodash';

// import models
import './cars/car.model';
import './constructors/constructor.model';

// set up container
const container = new Container();

// note that you *must* bind your controllers to Controller
container
    .bind<interfaces.Controller>(TYPE.Controller)
    .to(CarsController)
    .inSingletonScope()
    .whenTargetNamed(CarsController.name);
container
    .bind<interfaces.Controller>(TYPE.Controller)
    .to(CarBulkController)
    .inSingletonScope()
    .whenTargetNamed(CarBulkController.name);
container
    .bind<interfaces.Controller>(TYPE.Controller)
    .to(CarController)
    .inSingletonScope()
    .whenTargetNamed(CarController.name);
container
    .bind<CarsService>(CarsService.name)
    .to(CarsService)
    .inSingletonScope();
// create server
const server = new InversifyExpressServer(container);

server.setConfig((app: any) => {
    app.use('/api-docs/swagger', express.static('swagger'));
    app.use(
        '/api-docs/swagger/assets',
        express.static('node_modules/swagger-ui-dist')
    );
    app.use(bodyParser.json());
    app.use(
        swagger.express({
            definition: {
                info: {
                    title: 'My api',
                    version: '1.0',
                },
                models: {
                    ApiError: {
                        properties: {
                            code: {
                                type:
                                    SwaggerDefinitionConstant.Model.Property
                                        .Type.STRING,
                                example: ['400'],
                            },
                            message: {
                                type:
                                    SwaggerDefinitionConstant.Model.Property
                                        .Type.STRING,
                                example: ['Name of car is required.'],
                            },
                        },
                    },
                },
                responses: {
                    500: {},
                },
                externalDocs: {
                    url: 'My url',
                },
                securityDefinitions: {
                    apiKeyHeader: {
                        type: SwaggerDefinitionConstant.Security.Type.API_KEY,
                        in: SwaggerDefinitionConstant.Security.In.HEADER,
                        name: 'apiHeader',
                    },
                },
            },
        })
    );
});

server.setErrorConfig((app: any) => {
    app.use(
        (
            err: Error,
            request: express.Request,
            response: express.Response,
            next: express.NextFunction
        ) => {
            console.error(err.stack);
            response.status(500).send('Something broke!');
        }
    );
});

const app = server.build();

if (!_.isEqual(process.env.NODE_ENV, 'test')) {
    app.listen(config.port);
    console.info('Server is listening on port : ' + config.port);
}
