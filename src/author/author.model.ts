import { ApiModel, ApiModelProperty } from "../lib/swagger-express-ts";

@ApiModel( {
    description : "Description Author.",
    name: "Author"
} )
export class AuthorModel {

    @ApiModelProperty( {
        description : "Id of author" ,
        required : true
    } )
    id : string;

    @ApiModelProperty( {
        description : "Name of author" ,
        required : true
    } )
    name : string;
}