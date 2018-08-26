import {SwaggerService} from "./swagger.service";

export interface IApiPathArgs {
    path: string;
    name: string;
    description?: string;
    security?: { [key: string]: any[] };
    deprecated?: boolean;
    apiVersion?: string[];
}

export function ApiPath(args: IApiPathArgs): ClassDecorator {
    return function (target: any) {
        const apiVersions = args.apiVersion || ["v1"];
        apiVersions.forEach((apiV: string) => {
            SwaggerService.getInstance(apiV).addPath(args, target);
        });
    };
}
