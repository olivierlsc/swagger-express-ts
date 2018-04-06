import { ApiModel, ApiModelProperty } from "../lib/swagger-express-ts";
import {AuthorModel} from "../author/author.model";


@ApiModel({
  description: "Version description",
  name: "Version"
})
export class VersionModel {

  @ApiModelProperty({
    description: "number value",
    enum : ['1', '2']
  })
  number: number;

  @ApiModelProperty({
    required: true
  })
  description: string;

  @ApiModelProperty({
    description: "Description author",
    model: "Author"
  })
  author: AuthorModel;
}