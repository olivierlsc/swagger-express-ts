import {
    ISwagger,
    ISwaggerInfo,
    ISwaggerTag,
    ISwaggerPath,
    ISwaggerDefinition,
    ISwaggerOperation,
    ISwaggerOperationParameter,
    ISwaggerOperationResponse,
    ISwaggerOperationSchema,
    ISwaggerExternalDocs
} from "./i-swagger";
import { IApiPathArgs } from "./api-path.decorator";
import { IApiOperationPostArgs } from "./api-operation-post.decorator";
import { SwaggerDefinitionConstant } from "./swagger-definition.constant";
import * as _ from "lodash";
import {
    IApiOperationArgsBaseParameter,
    IApiOperationArgsBase,
    IApiOperationArgsBaseResponse
} from "./i-api-operation-args.base";
import { IApiOperationGetArgs } from "./api-operation-get.decorator";
import * as assert from "assert";

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
    paths?: {[key: string]: IPath};
    name?: string;
    description?: string;
}

export class SwaggerService {
    private static instance: SwaggerService;
    private controllerMap: any = [];
    private definitionsMap: {[key: string]: ISwaggerDefinition} = {};
    private data: ISwagger;

    private constructeur() {
    }

    public static getInstance(): SwaggerService {
        if ( ! SwaggerService.instance ) {
            let newSwaggerService: SwaggerService = new SwaggerService();
            newSwaggerService.initData();
            SwaggerService.instance = newSwaggerService;
        }
        return SwaggerService.instance;
    }

    public resetData(): void {
        this.initData();
    }

    private initData(): void {
        this.data = {
            basePath : "/",
            info : <ISwaggerInfo>{
                title : "",
                version : ""
            },
            paths : {},
            tags : [],
            schemes : [ SwaggerDefinitionConstant.Scheme.HTTP ],
            produces : [ SwaggerDefinitionConstant.Produce.JSON ],
            consumes : [ SwaggerDefinitionConstant.Consume.JSON ],
            definitions : {},
            swagger : "2.0"
        };
    }

    public getData(): ISwagger {
        return _.cloneDeep( this.data );
    }

    public setBasePath( basePath: string ): void {
        this.data.basePath = basePath;
    }

    public setOpenapi( openapi: string ): void {
        this.data.openapi = openapi;
    }

    public setInfo( info: ISwaggerInfo ): void {
        this.data.info = info;
    }

    public setSchemes( schemes: string[] ): void {
        this.data.schemes = schemes;
    }

    public setProduces( produces: string[] ): void {
        this.data.produces = produces;
    }

    public setConsumes( consumes: string[] ): void {
        this.data.consumes = consumes;
    }

    public setHost( host: string ): void {
        this.data.host = host;
    }

    public setDefinitions( definitions: {[key: string]: ISwaggerDefinition} ): void {
        this.data.definitions = definitions;
    }

    public setExternalDocs( externalDocs: ISwaggerExternalDocs ): void {
        this.data.externalDocs = externalDocs;
    }

    public addPath( args: IApiPathArgs, target: any ): void {
        let currentController: IController = {
            path : args.path,
            name : args.name,
            paths : {}
        };
        if ( args.description ) {
            currentController.description = args.description;
        }
        for ( let controllerIndex in this.controllerMap ) {
            let controller: IController = this.controllerMap[ controllerIndex ];
            if ( controllerIndex === target.name ) {
                currentController = controller;
                currentController.path = args.path;
                currentController.name = args.name;
                currentController.description = args.description;
            }
        }
        this.controllerMap[ target.name ] = currentController;
    }

    public addOperationGet( args: IApiOperationGetArgs, target: any, propertyKey: string | symbol ): void {
        assert.ok( args, "Args are required." );
        assert.ok( args.responses, "Responses are required." );
        if ( args.parameters ) {
            assert.ok( ! args.parameters.body, "Parameter body is not required." );
        }
        this.addOperation( "get", args, target, propertyKey );
    }

    public addOperationPost( args: IApiOperationPostArgs, target: any, propertyKey: string | symbol ): void {
        assert.ok( args, "Args are required." );
        assert.ok( args.parameters, "Parameters are required." );
        assert.ok( args.responses, "Responses are required." );
        this.addOperation( "post", args, target, propertyKey );
    }

    public addOperationPut( args: IApiOperationPostArgs, target: any, propertyKey: string | symbol ): void {
        assert.ok( args, "Args are required." );
        assert.ok( args.parameters, "Parameters are required." );
        assert.ok( args.responses, "Responses are required." );
        this.addOperation( "put", args, target, propertyKey );
    }

    public addOperationPatch( args: IApiOperationPostArgs, target: any, propertyKey: string | symbol ): void {
        assert.ok( args, "Args are required." );
        assert.ok( args.parameters, "Parameters are required." );
        assert.ok( args.responses, "Responses are required." );
        this.addOperation( "patch", args, target, propertyKey );
    }

    public addOperationDelete( args: IApiOperationPostArgs, target: any, propertyKey: string | symbol ): void {
        assert.ok( args, "Args are required." );
        assert.ok( args.parameters, "Parameters are required." );
        assert.ok( ! args.parameters.body, "Parameter body is not required." );
        assert.ok( args.responses, "Responses are required." );
        this.addOperation( "delete", args, target, propertyKey );
    }


    private addOperation( operation: string, args: IApiOperationArgsBase, target: any, propertyKey: string | symbol ): void {
        let currentController: IController = {
            paths : {}
        };
        for ( let index in this.controllerMap ) {
            let controller = this.controllerMap[ index ];
            if ( index === target.constructor.name ) {
                currentController = controller;
            }
        }

        let currentPath: IPath;
        if ( args.path && args.path.length > 0 ) {
            if ( ! currentController.paths[ args.path ] ) {
                currentController.paths[ args.path ] = <IPath>{};
            }
            currentPath = currentController.paths[ args.path ];
            currentPath.path = args.path;
        } else {
            if ( ! currentController.paths[ "/" ] ) {
                currentController.paths[ "/" ] = <IPath>{};
            }
            currentPath = currentController.paths[ "/" ];
        }

        if ( "get" === operation ) {
            currentPath.get = this.buildOperation( args, target, propertyKey );
        }

        if ( "post" === operation ) {
            currentPath.post = this.buildOperation( args, target, propertyKey );
        }

        if ( "put" === operation ) {
            currentPath.put = this.buildOperation( args, target, propertyKey );
        }

        if ( "patch" === operation ) {
            currentPath.patch = this.buildOperation( args, target, propertyKey );
        }

        if ( "delete" === operation ) {
            currentPath.delete = this.buildOperation( args, target, propertyKey );
        }

        this.controllerMap[ target.constructor.name ] = currentController;
    }

    private buildOperation( args: IApiOperationArgsBase, target: any, propertyKey: string | symbol ): ISwaggerOperation {
        let operation: ISwaggerOperation = {
            operationId : propertyKey,
            tags : []
        };
        if ( args.description ) {
            operation.description = args.description;
        }
        if ( args.summary ) {
            operation.summary = args.summary;
        }
        if ( args.produces && args.produces.length > 0 ) {
            operation.produces = args.produces;
        }

        if ( args.consumes && args.consumes.length > 0 ) {
            operation.consumes = args.consumes;
        }

        if ( args.parameters ) {
            operation.parameters = [];
            if ( args.parameters.path ) {
                operation.parameters = _.concat( operation.parameters, this.buildParameters( SwaggerDefinitionConstant.Parameter.In.PATH, args.parameters.path ) );
            }
            if ( args.parameters.query ) {
                operation.parameters = _.concat( operation.parameters, this.buildParameters( SwaggerDefinitionConstant.Parameter.In.QUERY, args.parameters.query ) );
            }
            if ( args.parameters.body ) {
                assert.ok( args.parameters.body.model, "Definition are required." );
                let newParameterBody: ISwaggerOperationParameter = {
                    name : SwaggerDefinitionConstant.Parameter.In.BODY,
                    in : SwaggerDefinitionConstant.Parameter.In.BODY
                };
                if ( args.parameters.body.required ) {
                    newParameterBody.required = true;
                }
                let swaggerOperationSchema: ISwaggerOperationSchema = {
                    $ref : this.buildRef( args.parameters.body.model )
                };
                newParameterBody.schema = swaggerOperationSchema;
                operation.parameters.push( newParameterBody );
            }
            if ( args.parameters.formData ) {
                operation.parameters = _.concat( operation.parameters, this.buildParameters( SwaggerDefinitionConstant.Parameter.In.FORM_DATA, args.parameters.formData ) );
            }
        }

        if ( args.responses ) {
            operation.responses = {};
            for ( let responseIndex in args.responses ) {
                let response: IApiOperationArgsBaseResponse = args.responses[ responseIndex ];
                let newSwaggerOperationResponse: ISwaggerOperationResponse = {};
                if ( response.description ) {
                    newSwaggerOperationResponse.description = response.description;
                } else {
                    switch ( responseIndex ) {
                        case "200":
                            newSwaggerOperationResponse.description = "Success";
                            break;
                        case "201":
                            newSwaggerOperationResponse.description = "Success and Created";
                            break;
                        case "204":
                            newSwaggerOperationResponse.description = "Success and 	No Content";
                            break;
                        case "400":
                            newSwaggerOperationResponse.description = "Client error and Bad Request";
                            break;
                        case "401":
                            newSwaggerOperationResponse.description = "Client error and Unauthorized";
                            break;
                        case "404":
                            newSwaggerOperationResponse.description = "Client error and Not Found";
                            break;
                        case "406":
                            newSwaggerOperationResponse.description = "Client error and Not Acceptable";
                            break;
                        default:
                            newSwaggerOperationResponse.description = null;
                    }

                }
                if ( response.model ) {
                    let ref = this.buildRef( response.model );
                    let newSwaggerOperationResponseSchema: ISwaggerOperationSchema = {
                        $ref : ref
                    };
                    if ( response.isArray ) {
                        newSwaggerOperationResponseSchema = {
                            items : {
                                $ref : ref
                            },
                            type : SwaggerDefinitionConstant.Response.Type.ARRAY
                        }
                    }
                    newSwaggerOperationResponse.schema = newSwaggerOperationResponseSchema;
                }
                operation.responses[ responseIndex ] = newSwaggerOperationResponse;
            }
        }

        return operation;
    }

    private buildParameters( type: string, parameters: {[key: string]: IApiOperationArgsBaseParameter} ): ISwaggerOperationParameter[] {
        let swaggerOperationParameter: ISwaggerOperationParameter[] = [];
        for ( let parameterIndex in parameters ) {
            let parameter: IApiOperationArgsBaseParameter = parameters[ parameterIndex ];
            let newSwaggerOperationParameter: ISwaggerOperationParameter = {
                name : parameterIndex,
                in : type,
                type : parameter.type
            };
            if ( parameter.description ) {
                newSwaggerOperationParameter.description = parameter.description;
            }
            if ( parameter.required ) {
                newSwaggerOperationParameter.required = true;
            }
            if ( parameter.format ) {
                newSwaggerOperationParameter.format = parameter.format;
            }
            if ( parameter.deprecated ) {
                newSwaggerOperationParameter.deprecated = true;
            }
            if ( parameter.allowEmptyValue ) {
                newSwaggerOperationParameter.allowEmptyValue = true;
            }
            swaggerOperationParameter.push( newSwaggerOperationParameter );
        }
        return swaggerOperationParameter;
    }

    public buildSwagger(): void {
        let data: ISwagger = _.cloneDeep( this.data );
        for ( let controllerIndex in this.controllerMap ) {
            let controller: IController = this.controllerMap[ controllerIndex ];
            if ( _.toArray( controller.paths ).length > 0 ) {
                for ( let pathIndex in controller.paths ) {
                    let path: IPath = controller.paths[ pathIndex ];
                    let swaggerPath: ISwaggerPath = {};
                    if ( path.get ) {
                        swaggerPath.get = path.get;
                        if ( ! swaggerPath.get.produces ) {
                            swaggerPath.get.produces = this.data.produces;
                        }
                        if ( ! swaggerPath.get.consumes ) {
                            swaggerPath.get.consumes = this.data.consumes;
                        }
                        swaggerPath.get.tags = [ _.capitalize( controller.name ) ];
                    }
                    if ( path.post ) {
                        swaggerPath.post = path.post;
                        if ( ! swaggerPath.post.produces ) {
                            swaggerPath.post.produces = this.data.produces;
                        }
                        if ( ! swaggerPath.post.consumes ) {
                            swaggerPath.post.consumes = this.data.consumes;
                        }
                        swaggerPath.post.tags = [ _.capitalize( controller.name ) ];
                    }
                    if ( path.put ) {
                        swaggerPath.put = path.put;
                        if ( ! swaggerPath.put.produces ) {
                            swaggerPath.put.produces = this.data.produces;
                        }
                        if ( ! swaggerPath.put.consumes ) {
                            swaggerPath.put.consumes = this.data.consumes;
                        }
                        swaggerPath.put.tags = [ _.capitalize( controller.name ) ];
                    }
                    if ( path.patch ) {
                        swaggerPath.patch = path.patch;
                        if ( ! swaggerPath.patch.produces ) {
                            swaggerPath.patch.produces = this.data.produces;
                        }
                        if ( ! swaggerPath.patch.consumes ) {
                            swaggerPath.patch.consumes = this.data.consumes;
                        }
                        swaggerPath.patch.tags = [ _.capitalize( controller.name ) ];
                    }
                    if ( path.delete ) {
                        swaggerPath.delete = path.delete;
                        if ( ! swaggerPath.delete.produces ) {
                            swaggerPath.delete.produces = this.data.produces;
                        }
                        if ( ! swaggerPath.delete.consumes ) {
                            swaggerPath.delete.consumes = this.data.consumes;
                        }
                        swaggerPath.delete.tags = [ _.capitalize( controller.name ) ];
                    }

                    if(path.path && path.path.length > 0){
                        data.paths[ controller.path.concat( path.path ) ] = swaggerPath;
                    } else {
                        data.paths[ controller.path ] = swaggerPath;
                    }
                }
            } else {
                let swaggerPath: ISwaggerPath = {};
                data.paths[ controller.path ] = swaggerPath;
            }
            data.tags.push( <ISwaggerTag>{
                name : _.capitalize( controller.name ),
                description : controller.description
            } );
        }
        this.data = data;
    }

    private buildRef( definition: string ): string {
        return "#/definitions/".concat( _.capitalize( definition ) );
    }

}