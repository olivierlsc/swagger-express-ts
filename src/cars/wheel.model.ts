import { ApiModel, ApiModelProperty } from 'swagger-express-ts';
import { CarModel } from './car.model';

@ApiModel({
    description: 'Car description',
    name: 'Wheel',
})
export class WheelModel {
    @ApiModelProperty({
        description: 'Id of wheel.',
        required: true,
        example: ['123456789', '12345'],
    })
    public id: string;

    @ApiModelProperty({
        description: 'Car wheel belongs to. This is to demonstrate a circular reference works.',
        required: true,
        model: 'Car',
        itemType: 'CarModel'
    })
    public car: CarModel | undefined;

}
