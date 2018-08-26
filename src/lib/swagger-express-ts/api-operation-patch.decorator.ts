import {SwaggerService} from "./swagger.service";
import {IApiOperationArgsBase} from "./i-api-operation-args.base";

export interface IApiOperationPatchArgs extends IApiOperationArgsBase {
}

export function ApiOperationPatch(args: IApiOperationPatchArgs): MethodDecorator {
    return function (target: any,
                     propertyKey: string | symbol,
                     descriptor: PropertyDescriptor) {
        const apiVersions = args.apiVersion || ["v1"];
        apiVersions.forEach((apiV: string) => {
            SwaggerService.getInstance(apiV).addOperationPatch(
                args,
                target,
                propertyKey
            );
        });
    };
}
