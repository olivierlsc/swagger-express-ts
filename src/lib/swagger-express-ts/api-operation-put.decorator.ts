import {SwaggerService} from "./swagger.service";
import {IApiOperationArgsBase} from "./i-api-operation-args.base";

export interface IApiOperationPutArgs extends IApiOperationArgsBase {
}

export function ApiOperationPut(args: IApiOperationPutArgs): MethodDecorator {
    return function (target: any,
                     propertyKey: string | symbol,
                     descriptor: PropertyDescriptor) {
        const apiVersions = args.apiVersion || ["v1"];
        apiVersions.forEach((apiV: string) => {
            SwaggerService.getInstance(apiV).addOperationPut(
                args,
                target,
                propertyKey
            );
        });
    };
}
