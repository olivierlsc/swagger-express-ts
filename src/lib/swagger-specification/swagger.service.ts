import { ISwagger, IContact, ILicense, IInfo } from "./i-swagger";

interface IPath {
    get?: any;
    post?: any;
    put?: any;
    delete?: any;
}

interface IController {
    path?: string;
    pathData?: IPath;
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
        paths : {},
        swagger : "2.0"
    };

    public static getData(): ISwagger {
        let data: ISwagger = SwaggerService.data;
        for ( let index in SwaggerService.controllerMap ) {
            let controller = SwaggerService.controllerMap[ index ];
            data.paths[ controller.path ] = controller.pathData;
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

    public static addPath( path: string, target: any ): void {
        let currentController: IController = {
            path : path
        };
        for ( let index in SwaggerService.controllerMap ) {
            let controller = SwaggerService.controllerMap[ index ];
            if ( index === target.name ) {
                currentController = controller;
                currentController.path = path;
            }
        }
        SwaggerService.controllerMap[ target.name ] = currentController;
    }

    public static addGetAction( args: any, target: any ): void {
        SwaggerService.addAction( "get", args, target );
    }

    public static addPostAction( args: any, target: any ): void {
        SwaggerService.addAction( "post", args, target );
    }

    private static addAction( action: string, args: any = {}, target: any ): void {
        let currentController: IController = {
            pathData : <IPath>{}
        };
        for ( let index in SwaggerService.controllerMap ) {
            let controller = SwaggerService.controllerMap[ index ];
            if ( index === target.constructor.name ) {
                currentController = controller;
            }
        }
        if ( action === "get" ) {
            currentController.pathData.get = args;
        }
        if ( action === "post" ) {
            currentController.pathData.post = args;
        }
        SwaggerService.controllerMap[ target.constructor.name ] = currentController;
    }

}