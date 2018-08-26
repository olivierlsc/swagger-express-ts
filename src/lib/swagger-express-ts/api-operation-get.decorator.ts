import {SwaggerService} from "./swagger.service";
import {IApiOperationArgsBase} from "./i-api-operation-args.base";

export interface IApiOperationGetArgs extends IApiOperationArgsBase {
}

export function ApiOperationGet(args: IApiOperationGetArgs): MethodDecorator {
    return function (target: any,
                     propertyKey: string | symbol,
                     descriptor: PropertyDescriptor) {
        const apiVersions = args.apiVersion || ["v1"];
        apiVersions.forEach((apiV: string) => {
            SwaggerService.getInstance(apiV).addOperationGet(
                args,
                target,
                propertyKey
            );
        });
    };
}
