import * as assert from 'assert';
import * as _ from 'lodash';
import { IApiModelArgs } from '.';
import { IApiModelPropertyArgs } from './api-model-property.decorator';
import { IApiOperationGetArgs } from './api-operation-get.decorator';
import { IApiOperationPostArgs } from './api-operation-post.decorator';
import { IApiPathArgs } from './api-path.decorator';
import {
  IApiBodyOperationArgsBaseParameter,
  IApiOperationArgsBase,
  IApiOperationArgsBaseParameter,
  IApiOperationArgsBaseResponse,
} from './i-api-operation-args.base';
import {
  ISwagger,
  ISwaggerDefinition,
  ISwaggerDefinitionProperty,
  ISwaggerDefinitionPropertyItems,
  ISwaggerExternalDocs,
  ISwaggerInfo,
  ISwaggerOperation,
  ISwaggerOperationParameter,
  ISwaggerOperationResponse,
  ISwaggerOperationSchema,
  ISwaggerOperationSchemaItems,
  ISwaggerPath,
  ISwaggerPropertySchemaOperation,
  ISwaggerTag,
} from './i-swagger';
import { SwaggerDefinitionConstant } from './swagger-definition.constant';
import {
  ISwaggerBuildDefinitionModel,
  ISwaggerBuildDefinitionModelProperty,
  ISwaggerSecurityDefinition,
} from './swagger.builder';

interface IPath {
  path: string;
  get?: ISwaggerOperation;
  post?: ISwaggerOperation;
  put?: ISwaggerOperation;
  patch?: ISwaggerOperation;
  delete?: ISwaggerOperation;
}

interface IController {
  path?: string;
  paths?: { [key: string]: IPath };
  name?: string;
  description?: string;
  security?: { [key: string]: any[] };
  deprecated?: boolean;
}

export class SwaggerService {
  public static getInstance(): SwaggerService {
    if (!SwaggerService.instance) {
      const newSwaggerService: SwaggerService = new SwaggerService();
      newSwaggerService.initData();
      SwaggerService.instance = newSwaggerService;
    }
    return SwaggerService.instance;
  }
  private static instance: SwaggerService;
  private controllerMap: { [key: string]: IController } = {};
  private data!: ISwagger;
  private modelsMap: { [key: string]: ISwaggerBuildDefinitionModel } = {};
  private globalResponses!: { [key: string]: ISwaggerOperationResponse };

  public resetData(): void {
    this.controllerMap = {};
    this.initData();
  }

  public getData(): ISwagger {
    return _.cloneDeep(this.data);
  }

  public setBasePath(basePath: string): void {
    this.data.basePath = basePath;
  }

  public setOpenapi(openapi: string): void {
    this.data.openapi = openapi;
  }

  public setInfo(info: ISwaggerInfo): void {
    this.data.info = info;
  }

  public setSchemes(schemes: string[]): void {
    this.data.schemes = schemes;
  }

  public setProduces(produces: string[]): void {
    this.data.produces = produces;
  }

  public setConsumes(consumes: string[]): void {
    this.data.consumes = consumes;
  }

  public setHost(host: string): void {
    this.data.host = host;
  }

  public setDefinitions(models: {
    [key: string]: ISwaggerBuildDefinitionModel;
  }): void {
    const definitions: { [key: string]: ISwaggerDefinition } = {};
    for (const modelIndex in models) {
      const model: ISwaggerBuildDefinitionModel = models[modelIndex];
      const newDefinition: ISwaggerDefinition = {
        type: SwaggerDefinitionConstant.Model.Type.OBJECT,
        properties: {},
        required: [],
      };
      if (model.description) {
        newDefinition.description = model.description;
      }
      for (const propertyIndex in model.properties) {
        const property: ISwaggerBuildDefinitionModelProperty =
          model.properties[propertyIndex];
        const newProperty: ISwaggerDefinitionProperty = {
          type: property.type,
        };
        newProperty.format = property.format;
        newProperty.description = property.description;
        newProperty.enum = property.enum;
        newProperty.example = property.example;
        if (property.itemType) {
          newProperty.items = {
            type: property.itemType,
          } as ISwaggerDefinitionPropertyItems;
        }
        if (property.model) {
          if (
            _.isEqual(
              SwaggerDefinitionConstant.Model.Property.Type.ARRAY,
              property.type,
            )
          ) {
            newProperty.items = {
              $ref: this.buildRef(property.model),
            } as ISwaggerDefinitionPropertyItems;
          } else {
            newProperty.$ref = this.buildRef(property.model);
          }
        }
        if (property.required && newDefinition.required) {
          newDefinition.required.push(propertyIndex);
        }
        newDefinition.properties[propertyIndex] = newProperty;
      }
      definitions[modelIndex] = newDefinition;
    }
    this.data.definitions = _.mergeWith(this.data.definitions, definitions);
  }

  public setExternalDocs(externalDocs: ISwaggerExternalDocs): void {
    this.data.externalDocs = externalDocs;
  }

  public setGlobalResponses(globalResponses: {
    [key: string]: IApiOperationArgsBaseResponse;
  }): void {
    this.globalResponses = this.buildOperationResponses(globalResponses);
  }

  public addPath(args: IApiPathArgs, target: any): void {
    let currentController: IController = {
      path: args.path,
      name: args.name,
      paths: {},
    };
    for (const controllerIndex in this.controllerMap) {
      const controller: IController = this.controllerMap[controllerIndex];
      if (controllerIndex === target.name) {
        currentController = controller;
        currentController.path = args.path;
        currentController.name = args.name;
        currentController.description = args.description;
        currentController.security = args.security;
        currentController.deprecated = args.deprecated;
      }
    }
    this.controllerMap[target.name] = _.mergeWith(
      this.controllerMap[target.name],
      currentController,
    );
  }

  public addOperationGet(
    args: IApiOperationGetArgs,
    target: any,
    propertyKey: string | symbol,
  ): void {
    assert.ok(args, 'Args are required.');
    assert.ok(args.responses, 'Responses are required.');
    if (args.parameters) {
      assert.ok(!args.parameters.body, 'Parameter body is not required.');
    }
    this.addOperation('get', args, target, propertyKey);
  }

  public addOperationPost(
    args: IApiOperationPostArgs,
    target: any,
    propertyKey: string | symbol,
  ): void {
    assert.ok(args, 'Args are required.');
    assert.ok(args.parameters, 'Parameters are required.');
    assert.ok(args.responses, 'Responses are required.');
    this.addOperation('post', args, target, propertyKey);
  }

  public addOperationPut(
    args: IApiOperationPostArgs,
    target: any,
    propertyKey: string | symbol,
  ): void {
    assert.ok(args, 'Args are required.');
    assert.ok(args.parameters, 'Parameters are required.');
    assert.ok(args.responses, 'Responses are required.');
    this.addOperation('put', args, target, propertyKey);
  }

  public addOperationPatch(
    args: IApiOperationPostArgs,
    target: any,
    propertyKey: string | symbol,
  ): void {
    assert.ok(args, 'Args are required.');
    assert.ok(args.parameters, 'Parameters are required.');
    assert.ok(args.responses, 'Responses are required.');
    this.addOperation('patch', args, target, propertyKey);
  }

  public addOperationDelete(
    args: IApiOperationPostArgs,
    target: any,
    propertyKey: string | symbol,
  ): void {
    assert.ok(args, 'Args are required.');
    assert.ok(args.parameters, 'Parameters are required.');
    assert.ok(!args.parameters.body, 'Parameter body is not required.');
    assert.ok(args.responses, 'Responses are required.');
    this.addOperation('delete', args, target, propertyKey);
  }

  public addSecurityDefinitions(securityDefinitions: {
    [key: string]: ISwaggerSecurityDefinition;
  }): void {
    this.data.securityDefinitions = securityDefinitions;
  }

  public buildSwagger(): void {
    const data: ISwagger = _.cloneDeep(this.data);
    for (const controllerIndex in this.controllerMap) {
      const controller: IController = this.controllerMap[controllerIndex];
      if (_.toArray(controller.paths).length > 0) {
        for (const pathIndex in controller.paths) {
          const path: IPath = controller.paths[pathIndex];
          const swaggerPath: ISwaggerPath = {};
          if (path.get) {
            swaggerPath.get = this.buildSwaggerOperation(path.get, controller);
          }
          if (path.post) {
            swaggerPath.post = this.buildSwaggerOperation(
              path.post,
              controller,
            );
          }
          if (path.put) {
            swaggerPath.put = this.buildSwaggerOperation(path.put, controller);
          }
          if (path.patch) {
            swaggerPath.patch = this.buildSwaggerOperation(
              path.patch,
              controller,
            );
          }
          if (path.delete) {
            swaggerPath.delete = this.buildSwaggerOperation(
              path.delete,
              controller,
            );
          }
          if (data && data.paths && controller && controller.path) {
            if (path.path && path.path.length > 0) {
              data.paths[controller.path.concat(path.path)] = {
                ...data.paths[controller.path.concat(path.path)],
                ...swaggerPath,
              };
            } else {
              data.paths[controller.path] = swaggerPath;
            }
          }
        }
      } else {
        if (data && data.paths && controller && controller.path) {
          const swaggerPath: ISwaggerPath = {};
          data.paths[controller.path] = swaggerPath;
        }
      }

      if (
        !_.find(
          data.tags,
          (tag: ISwaggerTag) => tag.name === _.upperFirst(controller.name),
        )
      ) {
        if (data && data.tags) {
          data.tags.push({
            name: _.upperFirst(controller.name),
            description: controller.description,
          } as ISwaggerTag);
        }
      }
    }
    this.data = data;
  }

  public addApiModelProperty(
    args: IApiModelPropertyArgs,
    target: any,
    propertyKey: string | symbol,
    propertyType: string,
  ) {
    const definitionKey = target.constructor.name;
    let swaggerBuildDefinitionModel: ISwaggerBuildDefinitionModel =
      this.modelsMap[definitionKey];
    if (!swaggerBuildDefinitionModel) {
      swaggerBuildDefinitionModel = {
        properties: {},
      };
      this.modelsMap[definitionKey] = swaggerBuildDefinitionModel;
    }

    const swaggerBuildDefinitionModelProperty: ISwaggerBuildDefinitionModelProperty =
      { type: _.lowerCase(propertyType) };
    if (args) {
      swaggerBuildDefinitionModelProperty.required = args.required;
      swaggerBuildDefinitionModelProperty.description = args.description;
      swaggerBuildDefinitionModelProperty.enum = args.enum;
      swaggerBuildDefinitionModelProperty.itemType = args.itemType;
      swaggerBuildDefinitionModelProperty.example = args.example;
      swaggerBuildDefinitionModelProperty.format = args.format;
      if (args.model) {
        swaggerBuildDefinitionModelProperty.model = args.model;
        if (!_.isEqual('Array', propertyType)) {
          swaggerBuildDefinitionModelProperty.type = undefined;
        }
      }
      if (args.type) {
        swaggerBuildDefinitionModelProperty.type = args.type;
      }
    }
    swaggerBuildDefinitionModel.properties[propertyKey.toString()] =
      swaggerBuildDefinitionModelProperty;
    this.setDefinitions(this.modelsMap);
  }

  public addApiModel(args: IApiModelArgs, target: any): any {
    const definitionKey = target.name;
    let swaggerBuildDefinitionModel: ISwaggerBuildDefinitionModel =
      this.modelsMap[definitionKey];
    if (!swaggerBuildDefinitionModel) {
      swaggerBuildDefinitionModel = {
        properties: {},
      };
      this.modelsMap[definitionKey] = swaggerBuildDefinitionModel;
    }
    if (args) {
      swaggerBuildDefinitionModel.description = args.description;
      if (args.name) {
        const name: string = _.upperFirst(args.name);
        this.modelsMap[name] = _.cloneDeep(this.modelsMap[definitionKey]);
        if (!_.isEqual(name, definitionKey)) {
          delete this.modelsMap[definitionKey];
          delete this.data.definitions[definitionKey];
        }
      }
    }
    this.setDefinitions(this.modelsMap);
  }

  private initData(): void {
    this.data = {
      basePath: '/',
      info: {
        title: '',
        version: '',
      } as ISwaggerInfo,
      paths: {},
      tags: [],
      schemes: [SwaggerDefinitionConstant.Scheme.HTTP],
      produces: [SwaggerDefinitionConstant.Produce.JSON],
      consumes: [SwaggerDefinitionConstant.Consume.JSON],
      definitions: {},
      swagger: '2.0',
    };
  }

  private addOperation(
    operation: string,
    args: IApiOperationArgsBase,
    target: any,
    propertyKey: string | symbol,
  ): void {
    let currentController: IController = {
      paths: {},
    };
    for (const index in this.controllerMap) {
      const controller = this.controllerMap[index];
      if (index === target.constructor.name) {
        currentController = controller;
      }
    }

    let currentPath: IPath;
    if (currentController && currentController.paths) {
      if (args.path && args.path.length > 0) {
        if (!currentController.paths[args.path]) {
          currentController.paths[args.path] = {} as IPath;
        }
        currentPath = currentController.paths[args.path];
        currentPath.path = args.path;
      } else {
        if (!currentController.paths['/']) {
          currentController.paths['/'] = {} as IPath;
        }
        currentPath = currentController.paths['/'];
      }

      if ('get' === operation) {
        currentPath.get = this.buildOperation(args, target, propertyKey);
      }

      if ('post' === operation) {
        currentPath.post = this.buildOperation(args, target, propertyKey);
      }

      if ('put' === operation) {
        currentPath.put = this.buildOperation(args, target, propertyKey);
      }

      if ('patch' === operation) {
        currentPath.patch = this.buildOperation(args, target, propertyKey);
      }

      if ('delete' === operation) {
        currentPath.delete = this.buildOperation(args, target, propertyKey);
      }
    }

    this.controllerMap[target.constructor.name] = currentController;
  }

  private buildOperation(
    args: IApiOperationArgsBase,
    target: any,
    propertyKey: string | symbol,
  ): ISwaggerOperation {
    const operation: ISwaggerOperation = {
      operationId: propertyKey,
      tags: [],
    };
    if (args.description) {
      operation.description = args.description;
    }
    if (args.summary) {
      operation.summary = args.summary;
    }
    if (args.produces && args.produces.length > 0) {
      operation.produces = args.produces;
    }

    if (args.consumes && args.consumes.length > 0) {
      operation.consumes = args.consumes;
    }

    if (args.tags && args.tags.length > 0) {
      operation.tags = args.tags;
    }

    if (args.deprecated) {
      operation.deprecated = args.deprecated;
    }

    if (args.parameters) {
      operation.parameters = [];
      if (args.parameters.header) {
        operation.parameters = _.concat(
          operation.parameters,
          this.buildParameters(
            SwaggerDefinitionConstant.Parameter.In.HEADER,
            args.parameters.header,
          ),
        );
      }
      if (args.parameters.path) {
        operation.parameters = _.concat(
          operation.parameters,
          this.buildParameters(
            SwaggerDefinitionConstant.Parameter.In.PATH,
            args.parameters.path,
          ),
        );
      }
      if (args.parameters.query) {
        operation.parameters = _.concat(
          operation.parameters,
          this.buildParameters(
            SwaggerDefinitionConstant.Parameter.In.QUERY,
            args.parameters.query,
          ),
        );
      }
      if (args.parameters.body) {
        operation.parameters = _.concat(
          operation.parameters,
          this.buildBodyOperationParameter(args.parameters.body),
        );
      }
      if (args.parameters.formData) {
        operation.parameters = _.concat(
          operation.parameters,
          this.buildParameters(
            SwaggerDefinitionConstant.Parameter.In.FORM_DATA,
            args.parameters.formData,
          ),
        );
      }
    }

    if (args.responses) {
      operation.responses = this.buildOperationResponses(args.responses);
    }

    if (args.security) {
      operation.security = this.buildOperationSecurity(args.security);
    }

    return operation;
  }

  private buildOperationResponses(responses: {
    [key: string]: IApiOperationArgsBaseResponse;
  }): {
    [key: string]: ISwaggerOperationResponse;
  } {
    const swaggerOperationResponses: {
      [key: string]: ISwaggerOperationResponse;
    } = {};
    for (const responseIndex in responses) {
      const response: IApiOperationArgsBaseResponse = responses[responseIndex];
      const newSwaggerOperationResponse: ISwaggerOperationResponse = {};
      if (response.description) {
        newSwaggerOperationResponse.description = response.description;
      } else {
        switch (responseIndex) {
          case '200':
            newSwaggerOperationResponse.description = 'Success';
            break;
          case '201':
            newSwaggerOperationResponse.description = 'Created';
            break;
          case '202':
            newSwaggerOperationResponse.description = 'Accepted';
            break;
          case '203':
            newSwaggerOperationResponse.description =
              'Non-Authoritative Information';
            break;
          case '204':
            newSwaggerOperationResponse.description = 'No Content';
            break;
          case '205':
            newSwaggerOperationResponse.description = 'Reset Content';
            break;
          case '206':
            newSwaggerOperationResponse.description = 'Partial Content';
            break;
          case '400':
            newSwaggerOperationResponse.description =
              'Client error and Bad Request';
            break;
          case '401':
            newSwaggerOperationResponse.description =
              'Client error and Unauthorized';
            break;
          case '404':
            newSwaggerOperationResponse.description =
              'Client error and Not Found';
            break;
          case '406':
            newSwaggerOperationResponse.description =
              'Client error and Not Acceptable';
            break;
          case '500':
            newSwaggerOperationResponse.description = 'Internal Server Error';
            break;
          case '501':
            newSwaggerOperationResponse.description = 'Not Implemented';
            break;
          case '503':
            newSwaggerOperationResponse.description = 'Service Unavailable';
            break;
          default:
            newSwaggerOperationResponse.description = null;
        }
      }
      if (response.model) {
        const ref = this.buildRef(response.model);
        let newSwaggerOperationResponseSchema: ISwaggerOperationSchema = {
          $ref: ref,
        };
        if (
          _.isEqual(
            response.type,
            SwaggerDefinitionConstant.Response.Type.ARRAY,
          )
        ) {
          newSwaggerOperationResponseSchema = {
            items: {
              $ref: ref,
            } as ISwaggerOperationSchemaItems,
            type: SwaggerDefinitionConstant.Response.Type.ARRAY,
          };
        }
        newSwaggerOperationResponse.schema = newSwaggerOperationResponseSchema;
      }
      swaggerOperationResponses[responseIndex] = newSwaggerOperationResponse;
    }
    return swaggerOperationResponses;
  }

  private buildBodyOperationParameter(
    bodyOperationArgsBaseParameter: IApiBodyOperationArgsBaseParameter,
  ): ISwaggerOperationParameter[] {
    const swaggerOperationParameterList: ISwaggerOperationParameter[] = [];
    const swaggerOperationParameter = {} as ISwaggerOperationParameter;
    swaggerOperationParameter.name = bodyOperationArgsBaseParameter.name
      ? bodyOperationArgsBaseParameter.name
      : 'body';
    swaggerOperationParameter.in = 'body';
    swaggerOperationParameter.type = bodyOperationArgsBaseParameter.type;
    swaggerOperationParameter.description =
      bodyOperationArgsBaseParameter.description;
    swaggerOperationParameter.required =
      bodyOperationArgsBaseParameter.required;
    swaggerOperationParameter.format = bodyOperationArgsBaseParameter.format;
    swaggerOperationParameter.deprecated =
      bodyOperationArgsBaseParameter.deprecated;
    swaggerOperationParameter.allowEmptyValue =
      bodyOperationArgsBaseParameter.allowEmptyValue;
    swaggerOperationParameter.minimum = bodyOperationArgsBaseParameter.minimum;
    swaggerOperationParameter.maximum = bodyOperationArgsBaseParameter.maximum;
    swaggerOperationParameter.default = bodyOperationArgsBaseParameter.default;
    let schema = {} as ISwaggerOperationSchema;
    if (bodyOperationArgsBaseParameter.properties) {
      schema.type = 'object';
      schema.required = [];
      schema.properties = {} as {
        [key: string]: ISwaggerPropertySchemaOperation;
      };
      for (const propetyIndex in bodyOperationArgsBaseParameter.properties) {
        const propertyBodyOperationArgsBaseParameter =
          bodyOperationArgsBaseParameter.properties[propetyIndex];
        const propertySchemaOperation = {} as ISwaggerPropertySchemaOperation;
        propertySchemaOperation.type =
          propertyBodyOperationArgsBaseParameter.type;
        schema.properties[propetyIndex] = propertySchemaOperation;
        if (propertyBodyOperationArgsBaseParameter.required) {
          schema.required.push(propetyIndex);
        }
      }
    }
    if (bodyOperationArgsBaseParameter.model) {
      const swaggerOperationSchema: ISwaggerOperationSchema = {
        $ref: this.buildRef(bodyOperationArgsBaseParameter.model),
      };

      if (bodyOperationArgsBaseParameter.type !== 'array') {
        schema = swaggerOperationSchema;
      } else {
        schema.type = bodyOperationArgsBaseParameter.type;
        schema.items = {
          $ref: this.buildRef(bodyOperationArgsBaseParameter.model),
        };
      }
    }
    swaggerOperationParameter.schema = schema;
    swaggerOperationParameterList.push(swaggerOperationParameter);
    return swaggerOperationParameterList;
  }

  private buildOperationSecurity(argsSecurity: {
    [key: string]: any[];
  }): { [key: string]: any[] }[] {
    const securityToReturn = [];
    for (const securityIndex in argsSecurity) {
      const security: any[] = argsSecurity[securityIndex];
      const result: { [key: string]: any[] } = {};
      result[securityIndex] = security;
      securityToReturn.push(result);
    }
    return securityToReturn;
  }

  private buildParameters(
    type: string,
    parameters: { [key: string]: IApiOperationArgsBaseParameter },
  ): ISwaggerOperationParameter[] {
    const swaggerOperationParameter: ISwaggerOperationParameter[] = [];
    for (const parameterIndex in parameters) {
      const parameter: IApiOperationArgsBaseParameter =
        parameters[parameterIndex];
      const newSwaggerOperationParameter: ISwaggerOperationParameter = {
        name: parameterIndex,
        in: type,
        type: parameter.type,
        items: parameter.items,
      };
      if (parameter.name) {
        newSwaggerOperationParameter.name = parameter.name;
      }
      newSwaggerOperationParameter.description = parameter.description;
      newSwaggerOperationParameter.required = parameter.required;
      newSwaggerOperationParameter.format = parameter.format;
      newSwaggerOperationParameter.deprecated = parameter.deprecated;
      newSwaggerOperationParameter.allowEmptyValue = parameter.allowEmptyValue;
      newSwaggerOperationParameter.minimum = parameter.minimum;
      newSwaggerOperationParameter.maximum = parameter.maximum;
      newSwaggerOperationParameter.default = parameter.default;
      swaggerOperationParameter.push(newSwaggerOperationParameter);
    }
    return swaggerOperationParameter;
  }

  private buildSwaggerOperation(
    operation: ISwaggerOperation,
    controller: IController,
  ): ISwaggerOperation {
    if (_.isUndefined(operation.produces)) {
      operation.produces = this.data.produces;
    }
    if (_.isUndefined(operation.consumes)) {
      operation.consumes = this.data.consumes;
    }
    if (_.isUndefined(operation.security) && controller.security) {
      operation.security = this.buildOperationSecurity(controller.security);
    }
    if (_.isUndefined(operation.deprecated) && controller.deprecated) {
      operation.deprecated = controller.deprecated;
    }
    if (this.globalResponses) {
      operation.responses = _.mergeWith(
        _.cloneDeep(this.globalResponses),
        operation.responses,
      );
    }
    if (operation.tags && operation.tags.length > 0) {
      operation.tags.unshift(_.upperFirst(controller.name));
    } else {
      operation.tags = [_.upperFirst(controller.name)];
    }
    return operation;
  }

  private buildRef(definition: string): string {
    return '#/definitions/'.concat(_.upperFirst(definition));
  }
}
