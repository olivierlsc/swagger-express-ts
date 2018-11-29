import {
    ApiModelProperty,
    ApiModel,
} from '../../../node_modules/swagger-express-ts';

export class MainEntity {
    @ApiModelProperty({
        description: 'main name description',
        required: true,
    })
    public mainName: string;

    @ApiModelProperty({
        description: '',
        required: true,
    })
    public mainNumber: string;
}
