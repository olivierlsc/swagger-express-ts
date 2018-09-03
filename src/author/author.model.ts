import {ApiModel, ApiModelProperty, SwaggerDefinitionConstant} from "../lib/swagger-express-ts";

@ApiModel({
    description: "Description Author.",
    name: "Author"
})
export class AuthorModel {
    @ApiModelProperty({
        description: "Id of author",
        required: true
    })
    public id: string;

    @ApiModelProperty({
        description: "Name of author",
        required: true,
        itemType: SwaggerDefinitionConstant.Model.Property.Type.STRING
    })
    public name: string[];
}
