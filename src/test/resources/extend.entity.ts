import {
    ApiModelProperty,
    ApiModel,
} from '../../../node_modules/swagger-express-ts';
import { MainEntity } from './main.entity';

@ApiModel({
    description: 'Extend description',
    name: 'Extend',
})
export class ExtendingEntity extends MainEntity {
    @ApiModelProperty({
        description: '',
        required: true,
    })
    public extendNumber: string;

    @ApiModelProperty({
        description: 'extend main name',
        required: true,
    })
    public mainNumber: string;
}
