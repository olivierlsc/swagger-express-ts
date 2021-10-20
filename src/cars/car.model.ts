import { ApiModel, ApiModelProperty } from 'swagger-express-ts';
import { ConstructorModel } from '../constructors/constructor.model';
import { WheelModel } from './wheel.model';

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
    public id: string;

    @ApiModelProperty({
        description: '',
        required: true,
    })
    public name: string;

    @ApiModelProperty({
        description: 'Description of car',
        required: true,
    })
    public description: string;

    @ApiModelProperty({
        description: 'Constructor of car',
        model: 'Constructor',
    })
    public author: ConstructorModel;

    @ApiModelProperty({
        description: 'Wheel car has. This is to demonstarte a cicrular reference works.',
        required: true,
        model: 'Wheel'
    })
    public wheel: WheelModel | undefined;
}
