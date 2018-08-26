import {SwaggerService} from "./swagger.service";
import {IApiOperationArgsBase} from "./i-api-operation-args.base";

export interface IApiOperationPostArgs extends IApiOperationArgsBase {
}

export function ApiOperationPost(args: IApiOperationPostArgs): MethodDecorator {
    return function (target: any,
                     propertyKey: string | symbol,
                     descriptor: PropertyDescriptor) {
        const apiVersions = args.apiVersion || ["v1"];
        apiVersions.forEach((apiV: string) => {
            SwaggerService.getInstance(apiV).addOperationPost(
                args,
                target,
                propertyKey
            );
        });
    };
}
