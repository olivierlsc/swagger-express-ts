import {SwaggerService} from "./swagger.service";

export interface IApiModelArgs {
    description?: string;
    name?: string;
}

export function ApiModel(args?: IApiModelArgs): ClassDecorator {
    return (target: any) => {
        SwaggerService.getInstance().addApiModel(args, target);
    };
}
