import {SwaggerService} from "./swagger.service";
import {IApiOperationArgsBase} from "./i-api-operation-args.base";

export interface IApiModelPropertyArgs {
    /**
     * Define if property is required.
     * Optional. Default is false.
     */
    required?: boolean;

    /**
     * Define format of property. Example: SwaggerDefinitionConstant.Definition.Property.Format.INT_64
     * Optional.
     */
    format?: string;

    /**
     * Define type of property. Example: SwaggerDefinitionConstant.Definition.Property.Type.STRING
     * Optional.
     */
    type?: string;

    /**
     * Define description.
     * Optional.
     */
    description?: string;

    /**
     * Define enum;
     * Optional.
     */
    enum?: string[];

    /**
     * Define model.
     * Optional.
     */
    model?: string;

    /**
     * Define type of item. Example: SwaggerDefinitionConstant.Definition.Property.Type.STRING
     * Optional.
     */
    itemType?: string;

    /**
     * Define apiVersion. Example: v1
     * Optional.
     */
    apiVersion?: string[];
}

export function ApiModelProperty(args?: IApiModelPropertyArgs): PropertyDecorator {
    return function (target: any, propertyKey: string | symbol) {
        const propertyType = Reflect.getMetadata("design:type", target, propertyKey)
            .name;
        const apiVersions = args.apiVersion || ["v1"];
        apiVersions.forEach((apiV: string) => {
            SwaggerService.getInstance(apiV).addApiModelProperty(
                args,
                target,
                propertyKey,
                propertyType
            );
        });
    };
}
