import {
    ApiModel,
    ApiModelProperty,
    SwaggerDefinitionConstant,
} from 'swagger-express-ts';

@ApiModel({
    description: 'Description Constructor.',
    name: 'Constructor',
})
export class ConstructorModel {
    @ApiModelProperty({
        description: 'Id of Constructor',
        required: true,
    })
    public id: string;

    @ApiModelProperty({
        description: 'Name of Constructor',
        required: true,
        itemType: SwaggerDefinitionConstant.Model.Property.Type.STRING,
    })
    public name: string[];
}
