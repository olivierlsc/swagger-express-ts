import { ISwagger, IContact, ILicense, IInfo, ITag } from "./i-swagger";
import { IApiPathArgs } from "./api-path.decorator";
import { IApiGetArgs } from "../../../dist/api-get.decorator";
import { IApiPostArgs } from "./api-post.decorator";

interface IPath {
    path?: string;
    description: string;
    summary: string;
    tags: string[];
    operationId: string | symbol;
}

interface IPaths {
    get?: IPath;
    post?: IPath;
    put?: IPath;
    delete?: IPath;
}

interface IController {
    path?: string;
    paths?: IPaths;
    name?: string;
    description?: string;
}

export class SwaggerService {
    private static controllerMap: any = [];
    private static data: ISwagger = {
        basePath : "/",
        openapi : "",
        info : <IInfo>{
            title : "",
            contact : <IContact>{},
            license : <ILicense>{
                name : ""
            },
            version : ""
        },
        paths : <IPaths>{},
        tags : [],
        swagger : "2.0"
    };

    public static getData(): ISwagger {
        let data: ISwagger = SwaggerService.data;
        for ( let controllerIndex in SwaggerService.controllerMap ) {
            let controller = SwaggerService.controllerMap[ controllerIndex ];
            data.paths[ controller.path ] = controller.paths;
            for ( let pathsIndex in data.paths ) {
                let paths = data.paths[ pathsIndex ];
                for ( let pathIndex in paths ) {
                    let path = paths[ pathIndex ];
                    path.tags = [ controller.name ];
                }
            }
            data.tags.push( <ITag>{
                name : controller.name, description : controller.description
            } );
        }
        return data;
    }

    public static setBasePath( basePath: string ): void {
        SwaggerService.data.basePath = basePath;
    }

    public static setOpenapi( openapi: string ): void {
        SwaggerService.data.openapi = openapi;
    }

    public static setInfo( info: IInfo ): void {
        SwaggerService.data.info = info;
    }

    public static addPath( args: IApiPathArgs, target: any ): void {
        let currentController: IController = {
            path : args.path,
            name : args.name,
            description : args.description
        };
        for ( let index in SwaggerService.controllerMap ) {
            let controller = SwaggerService.controllerMap[ index ];
            if ( index === target.name ) {
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

    public static addPostAction( args: IApiPostArgs, target: any, propertyKey: string | symbol ): void {
        SwaggerService.addAction( "post", args, target, propertyKey );
    }

    private static addAction( action: string, args: any = {}, target: any, propertyKey: string | symbol ): void {
        let currentController: IController = {
            paths : <IPaths>{}
        };
        for ( let index in SwaggerService.controllerMap ) {
            let controller = SwaggerService.controllerMap[ index ];
            if ( index === target.constructor.name ) {
                currentController = controller;
            }
        }
        if ( action === "get" ) {
            currentController.paths.get = args;
            currentController.paths.get.operationId = propertyKey;
        }
        if ( action === "post" ) {
            currentController.paths.post = args;
            currentController.paths.post.operationId = propertyKey;
        }
        SwaggerService.controllerMap[ target.constructor.name ] = currentController;
    }

}