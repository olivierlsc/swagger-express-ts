import { ApiModel, ApiModelProperty } from "../lib/swagger-express-ts";
import { AuthorModel } from "../author/author.model";

@ApiModel({
  description: "Version description",
  name: "Version"
})
export class VersionModel {
  @ApiModelProperty({
    description: "Id of version",
    required: true
  })
  public id: string;

  @ApiModelProperty({
    description: "",
    required: true
  })
  public name: string;

  @ApiModelProperty({
    description: "Description of version",
    required: true
  })
  public description: string;

  @ApiModelProperty({
    description: "Author of version",
    model: "Author"
  })
  public author: AuthorModel;
}
