import { ApiModelProperty, ApiModel } from "../../lib/swagger-express-ts";

export class MainEntity {
  @ApiModelProperty({
    description: "main name description",
    required: true
  })
  mainName: string;

  @ApiModelProperty({
    description: "",
    required: true
  })
  mainNumber: string;
}
