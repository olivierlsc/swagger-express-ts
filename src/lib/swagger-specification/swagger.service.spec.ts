import { SwaggerService } from "./swagger.service";
import * as chai from "chai";
const expect = chai.expect;

describe( "SwaggerService", () => {
    describe( "setBasePath", () => {
        it( "expect basePath default \"/\"", () => {
            expect( SwaggerService.getData().basePath ).equal( "/" );
        } );

        it( "expect basePath exist when it set", () => {
            let basePath = "/basepath";

            SwaggerService.setBasePath( basePath );

            expect( SwaggerService.getData().basePath ).equal( basePath );
        } );
    } );

    describe( "setOpenapi", () => {
        it( "expect openapi exist when it set", () => {
            let openapi = "openapi";

            SwaggerService.setOpenapi( openapi );

            expect( SwaggerService.getData().openapi ).equal( openapi );
        } );
    } );
} );