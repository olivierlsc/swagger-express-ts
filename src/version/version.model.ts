import { ApiModel, ApiModelProperty } from 'swagger-express-ts';
import { AuthorModel } from '../author/author.model';

@ApiModel({
    description: 'Version description',
    name: 'Version',
})
export class VersionModel {
    @ApiModelProperty({
        description: 'Id of version',
        required: true,
    })
    id: string;

    @ApiModelProperty({
        description: '',
        required: true,
    })
    name: string;

    @ApiModelProperty({
        description: 'Description of version',
        required: true,
    })
    description: string;

    @ApiModelProperty({
        description: 'Author of version',
        model: 'Author',
    })
    author: AuthorModel;
}
