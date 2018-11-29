import { ApiModel, ApiModelProperty } from 'swagger-express-ts';
import { ConstructorModel } from '../constructors/constructor.model';

@ApiModel({
    description: 'Car description',
    name: 'Car',
})
export class CarModel {
    @ApiModelProperty({
        description: 'Id of car',
        required: true,
        example: ['123456789', '12345'],
    })
    id: string;

    @ApiModelProperty({
        description: '',
        required: true,
    })
    name: string;

    @ApiModelProperty({
        description: 'Description of car',
        required: true,
    })
    description: string;

    @ApiModelProperty({
        description: 'Constructor of car',
        model: 'Constructor',
    })
    author: ConstructorModel;
}
