import * as express from "express";
import { injectable } from "inversify";
import {
  controller,
  httpGet,
  interfaces,
  httpPost,
  requestParam,
  httpPut
} from "inversify-express-utils";
import {
  ApiPath,
  ApiOperationGet,
  ApiOperationPost
} from "../lib/swagger-express-ts/index";
import "reflect-metadata";
import { SwaggerDefinitionConstant } from "../lib/swagger-express-ts/swagger-definition.constant";
import { ApiOperationPut } from "../lib/swagger-express-ts/api-operation-put.decorator";

@ApiPath({
  path: "/versions",
  name: "Version",
  security: { basicAuth: [] }
})
@controller("/versions")
@injectable()
export class VersionController implements interfaces.Controller {
  public static TARGET_NAME: string = "VersionController";

  private data = [
    {
      id: "1",
      name: "Version 1",
      description: "Description Version 1",
      version: "1.0.0"
    },
    {
      id: "2",
      name: "Version 2",
      description: "Description Version 2",
      version: "2.0.0"
    }
  ];

  @ApiOperationGet({
    description: "Get versions objects list",
    summary: "Get versions list",
    responses: {
      200: {
        description: "Success",
        type: SwaggerDefinitionConstant.Response.Type.ARRAY,
        model: "Version"
      }
    },
    security: {
      apiKeyHeader: []
    }
  })
  @httpGet("/")
  public getVersions(
    request: express.Request,
    response: express.Response,
    next: express.NextFunction
  ): void {
    response.json(this.data);
  }

  @ApiOperationPost({
    description: "Post version object",
    summary: "Post new version",
    parameters: {
      body: { description: "New version", required: true, model: "Version" }
    },
    responses: {
      200: { description: "Success" },
      400: { description: "Parameters fail" }
    }
  })
  @httpPost("/")
  public postVersion(
    request: express.Request,
    response: express.Response,
    next: express.NextFunction
  ): void {
    if (!request.body) {
      return response.status(400).end();
    }
    this.data.push(request.body);
    response.json(request.body);
  }
}
