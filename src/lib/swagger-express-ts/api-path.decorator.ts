import { SwaggerService } from "./swagger.service";
export interface IApiPathArgs {
    path: string;
    name: string;
    description?: string;
    security?: {[key: string]: any[]};
}
export function ApiPath( args: IApiPathArgs ): ClassDecorator {
    return function ( target: any ) {
        SwaggerService.getInstance().addPath( args, target );
    }
}