import { ApiModel, ApiModelProperty } from "../lib/swagger-express-ts";


@ApiModel({
  description: "Version description"
})
export class Version {

  @ApiModelProperty({
    description: "number value",
    enum : ['1', '2']
  })
  number: number;

  @ApiModelProperty({
    required: true
  })
  description: string;
}