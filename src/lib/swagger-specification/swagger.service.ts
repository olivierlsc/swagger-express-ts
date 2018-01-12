import {
    ISwagger,
    ISwaggerContact,
    ISwaggerLicense,
    ISwaggerInfo,
    ISwaggerTag,
    ISwaggerPath,
    ISwaggerDefinition
} from "./i-swagger";
import { IApiPathArgs } from "./api-path.decorator";
import { IApiGetArgs } from "../../../dist/api-get.decorator";
import { IApiOperationPostArgs } from "./api-operation-post.decorator";
import { SwaggerDefinitionConstant } from "./swagger-definition.constant";
import * as _ from "lodash";

interface IAction {
    path?: string;
    description: string;
    summary: string;
    tags: string[];
    operationId: string | symbol;
    produces: string[];
    consumes: string[];
}

interface IPath {
    path: string;
    get?: IAction;
    post?: IAction;
    put?: IAction;
    delete?: IAction;
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
            description : args.description,
            paths : {}
        };
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

    public static addGetAction( args: IApiGetArgs, target: any, propertyKey: string | symbol ): void {
        SwaggerService.addAction( "get", args, target, propertyKey );
    }

    public static addPostAction( args: IApiOperationPostArgs, target: any, propertyKey: string | symbol ): void {
        SwaggerService.addAction( "post", args, target, propertyKey );
    }

    private static addAction( action: string, args: any = {}, target: any, propertyKey: string | symbol ): void {
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

        if ( "get" === action ) {
            currentPath.get = SwaggerService.buildAction( args, target, propertyKey );
        }

        if ( "post" === action ) {
            currentPath.post = SwaggerService.buildAction( args, target, propertyKey );
        }

        SwaggerService.controllerMap[ target.constructor.name ] = currentController;
    }

    private static buildAction( args: any = {}, target: any, propertyKey: string | symbol ): IAction {
        let action: IAction = {
            description : args.description,
            summary : args.summary,
            operationId : propertyKey,
            produces : [ SwaggerDefinitionConstant.Produce.JSON ],
            consumes : [ SwaggerDefinitionConstant.Consume.JSON ],
            tags : []
        };
        if ( args.produces && args.produces.length > 0 ) {
            action.produces = args.produces;
        }

        if ( args.consumes && args.consumes.length > 0 ) {
            action.consumes = args.consumes;
        }
        return action;
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
                    swaggerPath.get.tags = [ controller.name ];
                }
                if ( path.post ) {
                    swaggerPath.post = path.post;
                    swaggerPath.post.tags = [ controller.name ];
                }
                if ( path.path && path.path.length > 0 ) {
                    data.paths[ controller.path.concat( path.path ) ] = swaggerPath;
                } else {
                    data.paths[ controller.path ] = swaggerPath;
                }
            }
            data.tags.push( <ISwaggerTag>{
                name : controller.name, description : controller.description
            } );
        }
        SwaggerService.data = data;
    }

}