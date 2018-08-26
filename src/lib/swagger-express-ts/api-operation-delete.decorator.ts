import {SwaggerService} from "./swagger.service";
import {IApiOperationArgsBase} from "./i-api-operation-args.base";

export interface IApiOperationDeleteArgs extends IApiOperationArgsBase {
}

export function ApiOperationDelete(args: IApiOperationDeleteArgs): MethodDecorator {
    return function (target: any,
                     propertyKey: string | symbol,
                     descriptor: PropertyDescriptor) {
        const apiVersions = args.apiVersion || ["v1"];
        apiVersions.forEach((apiV: string) => {
            SwaggerService.getInstance(apiV).addOperationDelete(
                args,
                target,
                propertyKey
            );
        });
    };
}
