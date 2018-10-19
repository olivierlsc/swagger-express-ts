import * as express from 'express';
import { injectable, inject } from 'inversify';
import 'reflect-metadata';
import {
    controller,
    httpGet,
    interfaces,
    httpPost,
    requestParam,
    httpPut,
} from 'inversify-express-utils';
import {
    ApiPath,
    ApiOperationGet,
    ApiOperationPost,
    SwaggerDefinitionConstant,
    ApiOperationPut,
} from 'swagger-express-ts';
import { VersionsService } from './versions.service';
import { VersionModel } from './version.model';

@ApiPath({
    path: '/versions',
    name: 'Versions',
    security: { apiKeyHeader: [] },
})
@controller('/versions')
@injectable()
export class VersionsController implements interfaces.Controller {
    public static TARGET_NAME: string = 'VersionsController';

    constructor(
        @inject(VersionsService.TARGET_NAME)
        private versionsService: VersionsService
    ) {}

    @ApiOperationGet({
        description: 'Get versions objects list',
        summary: 'Get versions list',
        responses: {
            200: {
                type: SwaggerDefinitionConstant.Response.Type.ARRAY,
                model: 'Version',
            },
        },
        security: {
            apiKeyHeader: [],
        },
    })
    @httpGet('/')
    public getVersions(
        request: express.Request,
        response: express.Response,
        next: express.NextFunction
    ): void {
        response.json(this.versionsService.getVersions());
    }

    @ApiOperationPost({
        description: 'Post version object',
        summary: 'Post new version',
        parameters: {
            body: {
                description: 'New version',
                required: true,
                model: 'Version',
            },
        },
        responses: {
            200: {
                model: 'Version',
            },
            400: { description: 'Parameters fail' },
        },
    })
    @httpPost('/')
    public postVersion(
        request: express.Request,
        response: express.Response,
        next: express.NextFunction
    ): void {
        if (!request.body) {
            return response.status(400).end();
        }
        let newVersion = new VersionModel();
        newVersion.id = request.body.id;
        newVersion.name = request.body.name;
        newVersion.description = request.body.description;
        newVersion.author = request.body.author;
        this.versionsService.addVersion(request.body);
        response.json(request.body);
    }
}
