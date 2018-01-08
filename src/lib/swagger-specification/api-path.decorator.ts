import { SwaggerService } from "./swagger.service";
export function ApiPath( path: string ): ClassDecorator {
    return function ( target: any ) {
        SwaggerService.addPath( path, target );
    }
}