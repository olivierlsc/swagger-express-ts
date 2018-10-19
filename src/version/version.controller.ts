import { injectable, inject } from 'inversify';
import 'reflect-metadata';
import {
    interfaces,
    controller,
    httpGet,
    requestParam,
} from 'inversify-express-utils';
import {
    ApiPath,
    SwaggerDefinitionConstant,
    ApiOperationGet,
} from 'swagger-express-ts';
import * as express from 'express';
import { VersionsService } from './versions.service';

@ApiPath({
    name: 'Versions',
    path: '/versions/{id}',
})
@controller('/versions/:id')
@injectable()
export class VersionController implements interfaces.Controller {
    public static TARGET_NAME: string = 'VersionController';

    constructor(
        @inject(VersionsService.TARGET_NAME)
        private versionsService: VersionsService
    ) {}

    @ApiOperationGet({
        description: 'Get version object',
        parameters: {
            path: {
                id: {
                    required: true,
                    type: SwaggerDefinitionConstant.Parameter.Type.STRING,
                },
            },
        },
        responses: {
            200: {
                model: 'Version',
            },
            400: {},
        },
    })
    @httpGet('/')
    public getVersion(
        @requestParam('id') id: string,
        request: express.Request,
        response: express.Response,
        next: express.NextFunction
    ): void {
        response.json(this.versionsService.getVersionById(id));
    }
}
