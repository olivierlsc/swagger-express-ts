import { ApiModel, ApiModelProperty } from "../lib/swagger-express-ts";

@ApiModel( {
    description : "Description Author.",
    name: "Author"
} )
export class AuthorModel {

    @ApiModelProperty( {
        description : "Description id" ,
        required : true
    } )
    id : string;

    @ApiModelProperty( {
        description : "Description name" ,
        required : true
    } )
    name : string;
}