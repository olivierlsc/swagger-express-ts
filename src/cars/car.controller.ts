import { injectable, inject } from 'inversify';
import 'reflect-metadata';
import {
    interfaces,
    controller,
    httpGet,
    requestParam,
    httpHead,
} from 'inversify-express-utils';
import {
    ApiPath,
    SwaggerDefinitionConstant,
    ApiOperationGet,
    ApiOperationHead,
} from 'swagger-express-ts';
import * as express from 'express';
import { CarsService } from './cars.service';

@ApiPath({
    name: 'Cars',
    path: '/cars/{id}',
})
@controller('/cars/:id')
@injectable()
export class CarController implements interfaces.Controller {
    constructor(
        @inject(CarsService.name) private carsService: CarsService
    ) {}

    @ApiOperationGet({
        description: 'Get car object',
        parameters: {
            header: {
                'x-custom-header': {
                    required: true,
                    type: SwaggerDefinitionConstant.Parameter.Type.STRING,
                },
            },
            path: {
                id: {
                    required: true,
                    type: SwaggerDefinitionConstant.Parameter.Type.STRING,
                },
            },
        },
        responses: {
            200: {
                model: 'Car',
            },
            400: {},
        },
    })
    @httpGet('/')
    public getCar(
        @requestParam('id') id: string,
        request: express.Request,
        response: express.Response,
        next: express.NextFunction
    ): void {
        response.json(this.carsService.getCarById(id));
    }

    @ApiOperationHead({
      description: 'validate car',
      parameters: {
          path: {
              id: {
                  required: true,
                  type: SwaggerDefinitionConstant.Parameter.Type.STRING,
              },
          },
      },
      responses: {
          204: {
              description: 'ok',
          },
      },
  })
  @httpHead('/')
  public validateCar(
      request: express.Request,
      response: express.Response,
      next: express.NextFunction
  ): void {
      response.status(204);
  }
}
