import {
    ISwagger,
    ISwaggerContact,
    ISwaggerLicense,
    ISwaggerInfo,
    ISwaggerTag,
    ISwaggerPath,
    ISwaggerDefinition,
    ISwaggerOperation,
    ISwaggerOperationParameter,
    ISwaggerOperationResponse,
    ISwaggerOperationSchema
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
    private static controllerMap: any = [];
    private static definitionsMap: {[key: string]: ISwaggerDefinition} = {};
    private static data: ISwagger = {
        basePath : "/",
        openapi : "",
        info : <ISwaggerInfo>{
            title : "",
            contact : <ISwaggerContact>{},
            license : <ISwaggerLicense>{
                name : ""
            },
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

    public static getData(): ISwagger {
        return _.cloneDeep( SwaggerService.data );
    }

    public static setBasePath( basePath: string ): void {
        SwaggerService.data.basePath = basePath;
    }

    public static setOpenapi( openapi: string ): void {
        SwaggerService.data.openapi = openapi;
    }

    public static setInfo( info: ISwaggerInfo ): void {
        SwaggerService.data.info = info;
    }

    public static setSchemes( schemes: string[] ): void {
        SwaggerService.data.schemes = schemes;
    }

    public static setProduces( produces: string[] ): void {
        SwaggerService.data.produces = produces;
    }

    public static setConsumes( consumes: string[] ): void {
        SwaggerService.data.consumes = consumes;
    }

    public static setHost( host: string ): void {
        SwaggerService.data.host = host;
    }

    public static setDefinitions( definitions: {[key: string]: ISwaggerDefinition} ): void {
        SwaggerService.data.definitions = definitions;
    }

    public static addPath( args: IApiPathArgs, target: any ): void {
        let currentController: IController = {
            path : args.path,
            name : args.name,
            paths : {}
        };
        if ( args.description ) {
            currentController.description = args.description;
        }
        for ( let controllerIndex in SwaggerService.controllerMap ) {
            let controller: IController = SwaggerService.controllerMap[ controllerIndex ];
            if ( controllerIndex === target.name ) {
                currentController = controller;
                currentController.path = args.path;
                currentController.name = args.name;
                currentController.description = args.description;
            }
        }
        SwaggerService.controllerMap[ target.name ] = currentController;
    }

    public static addOperationGet( args: IApiOperationGetArgs, target: any, propertyKey: string | symbol ): void {
        assert.ok( args, "Args are required." );
        if ( args.parameters ) {
            assert.ok( ! args.parameters.body, "Parameter body is not required." );
        }
        SwaggerService.addOperation( "get", args, target, propertyKey );
    }

    public static addOperationPost( args: IApiOperationPostArgs, target: any, propertyKey: string | symbol ): void {
        assert.ok( args, "Args are required." );
        assert.ok( args.parameters, "Parameters are required." );
        SwaggerService.addOperation( "post", args, target, propertyKey );
    }

    public static addOperationPut( args: IApiOperationPostArgs, target: any, propertyKey: string | symbol ): void {
        assert.ok( args, "Args are required." );
        assert.ok( args.parameters, "Parameters are required." );
        SwaggerService.addOperation( "put", args, target, propertyKey );
    }

    public static addOperationPatch( args: IApiOperationPostArgs, target: any, propertyKey: string | symbol ): void {
        assert.ok( args, "Args are required." );
        assert.ok( args.parameters, "Parameters are required." );
        SwaggerService.addOperation( "patch", args, target, propertyKey );
    }

    public static addOperationDelete( args: IApiOperationPostArgs, target: any, propertyKey: string | symbol ): void {
        assert.ok( args, "Args are required." );
        assert.ok( args.parameters, "Parameters are required." );
        assert.ok( ! args.parameters.body, "Parameter body is not required." );
        SwaggerService.addOperation( "delete", args, target, propertyKey );
    }


    private static addOperation( operation: string, args: IApiOperationArgsBase, target: any, propertyKey: string | symbol ): void {
        let currentController: IController = {
            paths : {}
        };
        for ( let index in SwaggerService.controllerMap ) {
            let controller = SwaggerService.controllerMap[ index ];
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
            currentPath.get = SwaggerService.buildOperation( args, target, propertyKey );
        }

        if ( "post" === operation ) {
            currentPath.post = SwaggerService.buildOperation( args, target, propertyKey );
        }

        if ( "put" === operation ) {
            currentPath.put = SwaggerService.buildOperation( args, target, propertyKey );
        }

        if ( "patch" === operation ) {
            currentPath.patch = SwaggerService.buildOperation( args, target, propertyKey );
        }

        if ( "delete" === operation ) {
            currentPath.delete = SwaggerService.buildOperation( args, target, propertyKey );
        }

        SwaggerService.controllerMap[ target.constructor.name ] = currentController;
    }

    private static buildOperation( args: IApiOperationArgsBase, target: any, propertyKey: string | symbol ): ISwaggerOperation {
        let operation: ISwaggerOperation = {
            description : args.description,
            summary : args.summary,
            operationId : propertyKey,
            tags : [],
            produces : [],
            consumes : [],
            parameters : [],
            responses : {}
        };
        if ( args.produces && args.produces.length > 0 ) {
            operation.produces = args.produces;
        }

        if ( args.consumes && args.consumes.length > 0 ) {
            operation.consumes = args.consumes;
        }

        if ( args.parameters ) {
            if ( args.parameters.path ) {
                operation.parameters = _.concat( operation.parameters, SwaggerService.buildParameters( SwaggerDefinitionConstant.Parameter.In.PATH, args.parameters.path ) );
            }
            if ( args.parameters.query ) {
                operation.parameters = _.concat( operation.parameters, SwaggerService.buildParameters( SwaggerDefinitionConstant.Parameter.In.QUERY, args.parameters.query ) );
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
                    $ref : SwaggerService.buildRef( args.parameters.body.model )
                };
                newParameterBody.schema = swaggerOperationSchema;
                operation.parameters.push( newParameterBody );
            }
            if ( args.parameters.formData ) {
                operation.parameters = _.concat( operation.parameters, SwaggerService.buildParameters( SwaggerDefinitionConstant.Parameter.In.FORM_DATA, args.parameters.formData ) );
            }
        }

        for ( let responseIndex in args.responses ) {
            let response: IApiOperationArgsBaseResponse = args.responses[ responseIndex ];
            let newSwaggerOperationResponse: ISwaggerOperationResponse = {};
            if ( response.description ) {
                newSwaggerOperationResponse.description = response.description;
            }
            if ( response.model ) {
                let ref = SwaggerService.buildRef( response.model );
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

        return operation;
    }

    private static buildParameters( type: string, parameters: {[key: string]: IApiOperationArgsBaseParameter} ): ISwaggerOperationParameter[] {
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

    public static buildSwagger(): void {
        let data: ISwagger = _.cloneDeep( SwaggerService.data );
        for ( let controllerIndex in SwaggerService.controllerMap ) {
            let controller: IController = SwaggerService.controllerMap[ controllerIndex ];
            for ( let pathIndex in controller.paths ) {
                let path: IPath = controller.paths[ pathIndex ];
                let swaggerPath: ISwaggerPath = {};
                if ( path.get ) {
                    swaggerPath.get = path.get;
                    if ( swaggerPath.get.produces.length == 0 ) {
                        swaggerPath.get.produces = SwaggerService.data.produces;
                    }
                    if ( swaggerPath.get.consumes.length == 0 ) {
                        swaggerPath.get.consumes = SwaggerService.data.consumes;
                    }
                    swaggerPath.get.tags = [ _.capitalize( controller.name ) ];
                }
                if ( path.post ) {
                    swaggerPath.post = path.post;
                    if ( swaggerPath.post.produces.length == 0 ) {
                        swaggerPath.post.produces = SwaggerService.data.produces;
                    }
                    if ( swaggerPath.post.consumes.length == 0 ) {
                        swaggerPath.post.consumes = SwaggerService.data.consumes;
                    }
                    swaggerPath.post.tags = [ _.capitalize( controller.name ) ];
                }
                if ( path.put ) {
                    swaggerPath.put = path.put;
                    if ( swaggerPath.put.produces.length == 0 ) {
                        swaggerPath.put.produces = SwaggerService.data.produces;
                    }
                    if ( swaggerPath.put.consumes.length == 0 ) {
                        swaggerPath.put.consumes = SwaggerService.data.consumes;
                    }
                    swaggerPath.put.tags = [ _.capitalize( controller.name ) ];
                }
                if ( path.patch ) {
                    swaggerPath.patch = path.patch;
                    if ( swaggerPath.patch.produces.length == 0 ) {
                        swaggerPath.patch.produces = SwaggerService.data.produces;
                    }
                    if ( swaggerPath.patch.consumes.length == 0 ) {
                        swaggerPath.patch.consumes = SwaggerService.data.consumes;
                    }
                    swaggerPath.patch.tags = [ _.capitalize( controller.name ) ];
                }
                if ( path.delete ) {
                    swaggerPath.delete = path.delete;
                    if ( swaggerPath.delete.produces.length == 0 ) {
                        swaggerPath.delete.produces = SwaggerService.data.produces;
                    }
                    if ( swaggerPath.delete.consumes.length == 0 ) {
                        swaggerPath.delete.consumes = SwaggerService.data.consumes;
                    }
                    swaggerPath.delete.tags = [ _.capitalize( controller.name ) ];
                }

                if ( path.path && path.path.length > 0 ) {
                    data.paths[ controller.path.concat( path.path ) ] = swaggerPath;
                } else {
                    data.paths[ controller.path ] = swaggerPath;
                }
            }
            data.tags.push( <ISwaggerTag>{
                name : _.capitalize( controller.name ), description : controller.description
            } );
        }
        SwaggerService.data = data;
    }

    private static buildRef( definition: string ): string {
        return "#/definitions/".concat( _.capitalize( definition ) );
    }

}