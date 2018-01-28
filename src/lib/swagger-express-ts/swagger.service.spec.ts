import { SwaggerService } from "./swagger.service";
import * as chai from "chai";
import { ISwaggerExternalDocs } from "./i-swagger";
import {ISwaggerInfo} from "./i-swagger";
import {SwaggerDefinitionConstant} from "./swagger-definition.constant";
import {ISwaggerDefinition} from "./i-swagger";
import {ISwaggerDefinitionProperty} from "./i-swagger";
const expect = chai.expect;

describe ( "SwaggerService" , () => {

    beforeEach ( () => {
        SwaggerService.getInstance().resetData();
    } );

    describe ( "setBasePath" , () => {
        it ( "expect basePath default \"/\"" , () => {
            expect ( SwaggerService.getInstance().getData().basePath ).to.equal( "/" );
        } );

        it ( "expect basePath exist when it setted" , () => {
            let basePath = "/basepath";

            SwaggerService.getInstance().setBasePath( basePath );

            expect ( SwaggerService.getInstance().getData().basePath ).to.equal( basePath );
        } );
    } );

    describe ( "setOpenapi" , () => {
        it ( "expect default openapi when it not setted" , () => {
            expect ( SwaggerService.getInstance().getData().openapi ).to.not.exist;
        } );

        it ( "expect openapi exist when it setted" , () => {
            let openapi = "openapi";

            SwaggerService.getInstance().setOpenapi( openapi );

            expect ( SwaggerService.getInstance().getData().openapi ).to.equal( openapi );
        } );
    } );

    describe ( "setInfo" , () => {
        it ( "expect default info" , () => {
            expect ( SwaggerService.getInstance().getData().info.title ).to.equal( "" );
            expect ( SwaggerService.getInstance().getData().info.version ).to.equal( "" );
        } );

        it ( "expect info when it defined" , () => {
            let info : ISwaggerInfo = {
                title : "Title" ,
                version : "1.0.1"
            };

            SwaggerService.getInstance().setInfo( info );

            expect ( SwaggerService.getInstance().getData().info.title ).to.equal( info.title );
            expect ( SwaggerService.getInstance().getData().info.version ).to.equal( info.version );
        } );
    } );

    describe ( "setSchemes" , () => {
        it ( "expect default schemes when it not defined" , () => {
            expect ( SwaggerService.getInstance().getData().schemes )
                .to.have.lengthOf( 1 )
                .to.have.members( [ SwaggerDefinitionConstant.Scheme.HTTP ] );
        } );

        it ( "expect schemes when it defined" , () => {
            let schemes : string[] = [ SwaggerDefinitionConstant.Scheme.HTTP , SwaggerDefinitionConstant.Scheme.HTTPS ];

            SwaggerService.getInstance().setSchemes( schemes );

            expect ( SwaggerService.getInstance().getData().schemes ).to.deep.equal( schemes );
        } );
    } );

    describe ( "setExternalDocs" , () => {
        it ( "expect default externalDocs when it not defined" , () => {
            expect ( SwaggerService.getInstance().getData().externalDocs ).to.not.exist;
        } );

        it ( "expect externalDocs when it defined" , () => {
            let externalDocs : ISwaggerExternalDocs = {
                url : "Mon url"
            };

            SwaggerService.getInstance().setExternalDocs( externalDocs );

            expect ( SwaggerService.getInstance().getData().externalDocs.url ).to.equal( externalDocs.url );
        } );
    } );

    describe ( "setProduces" , () => {
        it ( "expect default produces when it not defined" , () => {
            expect ( SwaggerService.getInstance().getData().produces )
                .to.have.lengthOf( 1 )
                .to.have.members( [ SwaggerDefinitionConstant.Produce.JSON ] );
        } );

        it ( "expect produces when it defined" , () => {
            let produces : string[] = [ SwaggerDefinitionConstant.Produce.JSON , SwaggerDefinitionConstant.Produce.XML ];

            SwaggerService.getInstance().setProduces( produces );

            expect ( SwaggerService.getInstance().getData().produces ).to.deep.equal( produces );
        } );
    } );

    describe ( "setConsumes" , () => {
        it ( "expect default consumes when it not defined" , () => {
            expect ( SwaggerService.getInstance().getData().consumes )
                .to.have.lengthOf( 1 )
                .to.have.members( [ SwaggerDefinitionConstant.Consume.JSON ] );
        } );

        it ( "expect consumes when it defined" , () => {
            let consumes : string[] = [ SwaggerDefinitionConstant.Consume.JSON , SwaggerDefinitionConstant.Consume.XML ];

            SwaggerService.getInstance().setConsumes( consumes );

            expect ( SwaggerService.getInstance().getData().consumes ).to.deep.equal( consumes );
        } );
    } );

    describe ( "setHost" , () => {
        it ( "expect host not exist when it not defined" , () => {
            expect ( SwaggerService.getInstance().getData().host ).to.be.not.exist;
        } );

        it ( "expect host when it defined" , () => {
            let host : string = "host";

            SwaggerService.getInstance().setHost( host );

            expect ( SwaggerService.getInstance().getData().host ).to.equal( host );
        } );
    } );

    describe ( "setDefinitions" , () => {
        it ( "expect default definitions when they not defined" , () => {
            expect ( SwaggerService.getInstance().getData().definitions ).to.deep.equal( {} );
        } );

        it ( "expect definitions when they defined" , () => {
            let definitions : {[key: string]: ISwaggerDefinition} = {
                "/" : {
                    type : SwaggerDefinitionConstant.Definition.Type.OBJECT ,
                    properties : {
                        id : <ISwaggerDefinitionProperty>{ type : SwaggerDefinitionConstant.Definition.Property.Type.STRING }
                    }
                }
            };

            SwaggerService.getInstance().setDefinitions( definitions );

            expect ( SwaggerService.getInstance().getData().definitions ).to.deep.equal( definitions );
        } );
    } );
} );