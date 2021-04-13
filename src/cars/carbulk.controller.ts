import { injectable, inject } from 'inversify';
import 'reflect-metadata';
import { interfaces, controller, httpPost } from 'inversify-express-utils';
import { ApiPath, ApiOperationPost } from 'swagger-express-ts';
import * as express from 'express';
import { CarsService } from './cars.service';

@ApiPath({
    name: 'Cars',
    path: '/cars-bulk',
})
@controller('/cars-bulk')
@injectable()
export class CarBulkController implements interfaces.Controller {
    constructor(@inject(CarsService.name) private carsService: CarsService) {}

    @ApiOperationPost({
        description: 'Post car objects',
        summary: 'Post new cars',
        parameters: {
            body: {
                description: 'New car',
                required: true,
                model: 'Car',
                type: 'array',
            },
        },
        responses: {
            200: {
                model: 'Car',
            },
            400: { description: 'Parameters fail' },
        },
    })
    @httpPost('/')
    public postBulkCar(
        request: express.Request,
        response: express.Response,
        next: express.NextFunction
    ): void {
        if (!request.body) {
            return response.status(400).end();
        }
        console.log(request.body);
        console.log(this.carsService);
        response.json(request.body);
    }
}
