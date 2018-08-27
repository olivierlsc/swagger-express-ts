import { ApiModelProperty, ApiModel } from "../../lib/swagger-express-ts";
import { MainEntity } from "./main.entity";

@ApiModel({
  description: "Extend description",
  name: "Extend"
})
export class ExtendingEntity extends MainEntity {
  @ApiModelProperty({
    description: "",
    required: true
  })
  extendNumber: string;

  @ApiModelProperty({
    description: "extend main name",
    required: true
  })
  mainNumber: string;
}
