import { SwaggerService } from "./swagger.service";
import * as chai from "chai";
import { ISwaggerExternalDocs } from "./i-swagger";
const expect = chai.expect;

describe( "SwaggerService", () => {

    beforeEach( () => {
        SwaggerService.getInstance().resetData();
    } );

    describe( "setBasePath", () => {
        it( "expect basePath default \"/\"", () => {
            expect( SwaggerService.getInstance().getData().basePath ).equal( "/" );
        } );

        it( "expect basePath exist when it setted", () => {
            let basePath = "/basepath";

            SwaggerService.getInstance().setBasePath( basePath );

            expect( SwaggerService.getInstance().getData().basePath ).equal( basePath );
        } );
    } );

    describe( "setOpenapi", () => {
        it( "expect openapi exist when it setted", () => {
            let openapi = "openapi";

            SwaggerService.getInstance().setOpenapi( openapi );

            expect( SwaggerService.getInstance().getData().openapi ).equal( openapi );
        } );

        it( "expect openapi not exist when it not setted", () => {
            console.log(SwaggerService.getInstance().getData().openapi);
            expect( SwaggerService.getInstance().getData().openapi ).to.not.exist;
        } );
    } );

    describe( "setExternalDocs", () => {
        it( "expect externalDocs when it defined", () => {
            let externalDocs: ISwaggerExternalDocs = {
                url : "Mon url"
            };

            SwaggerService.getInstance().setExternalDocs( externalDocs );

            expect( SwaggerService.getInstance().getData().externalDocs ).equal( externalDocs );
        } );
    } );
} );