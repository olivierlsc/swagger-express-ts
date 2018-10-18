import {
    ApiModel,
    ApiModelProperty,
    SwaggerDefinitionConstant,
} from 'swagger-express-ts'
import { VersionModel } from '../version/version.model'

@ApiModel({
    description: 'Description Author.',
    name: 'Author',
})
export class AuthorModel {
    @ApiModelProperty({
        description: 'Id of author',
        required: true,
    })
    id: string

    @ApiModelProperty({
        description: 'Name of author',
        required: true,
        itemType: SwaggerDefinitionConstant.Model.Property.Type.STRING,
    })
    name: string[]
}
