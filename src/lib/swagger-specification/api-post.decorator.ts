import { SwaggerService } from "./swagger.service";
import { IApiActionArgsBase } from "./i-api-action-args.base";
export interface IApiPostArgs extends IApiActionArgsBase {

}

export function ApiPost( args: IApiPostArgs ): MethodDecorator {
    return function ( target: any, propertyKey: string | symbol, descriptor: PropertyDescriptor ) {
        SwaggerService.addPostAction( args, target, propertyKey );
    };
}
