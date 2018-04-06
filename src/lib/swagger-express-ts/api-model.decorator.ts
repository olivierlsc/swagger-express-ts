import { SwaggerService } from "./swagger.service";
import { IApiOperationArgsBase } from "./i-api-operation-args.base";

export interface IApiModelArgs {
    description?: string;
}

export function ApiModel ( args? : IApiModelArgs ) : ClassDecorator {
    return function ( target : any ) {
        SwaggerService.getInstance().addApiModel( args , target );
    };
}