import * as chai from 'chai';
import { SwaggerDefinitionConstant } from '.';
const expect = chai.expect;

describe('SwaggerDefinitionConstant', () => {
    describe('Produce', () => {
        it('expect JSON', () => {
            expect(SwaggerDefinitionConstant.Produce.JSON).exist;
        });
        it('expect XML', () => {
            expect(SwaggerDefinitionConstant.Produce.XML).exist;
        });
        it('expect ZIP', () => {
            expect(SwaggerDefinitionConstant.Produce.ZIP).exist;
        });
        it('expect PDF', () => {
            expect(SwaggerDefinitionConstant.Produce.PDF).exist;
        });
        it('expect X_WWW_FORM_URLENCODED', () => {
            expect(SwaggerDefinitionConstant.Produce.X_WWW_FORM_URLENCODED)
                .exist;
        });
        it('expect FORM_DATA', () => {
            expect(SwaggerDefinitionConstant.Produce.FORM_DATA).exist;
        });
        it('expect TEXT_PLAIN', () => {
            expect(SwaggerDefinitionConstant.Produce.TEXT_PLAIN).exist;
        });
        it('expect TEXT_HTML', () => {
            expect(SwaggerDefinitionConstant.Produce.TEXT_HTML).exist;
        });
        it('expect PNG', () => {
            expect(SwaggerDefinitionConstant.Produce.PNG).exist;
        });
        it('expect GIF', () => {
            expect(SwaggerDefinitionConstant.Produce.GIF).exist;
        });
        it('expect JPEG', () => {
            expect(SwaggerDefinitionConstant.Produce.JPEG).exist;
        });
    });

    describe('Scheme', () => {
        it('expect HTTP', () => {
            expect(SwaggerDefinitionConstant.Scheme.HTTP).exist;
        });
        it('expect HTTPS', () => {
            expect(SwaggerDefinitionConstant.Scheme.HTTPS).exist;
        });
    });

    describe('Model', () => {
        describe('Type', () => {
            it('expect OBJECT', () => {
                expect(SwaggerDefinitionConstant.Model.Type.OBJECT).exist;
            });
            it('expect ARRAY', () => {
                expect(SwaggerDefinitionConstant.Model.Type.ARRAY).exist;
            });
        });
        describe('Property', () => {
            describe('Type', () => {
                expectType(SwaggerDefinitionConstant.Model.Property.Type);
            });
            describe('Format', () => {
                it('expect INT_64', () => {
                    expect(
                        SwaggerDefinitionConstant.Model.Property.Format.INT_64
                    ).exist;
                });
            });
        });
    });

    describe('Parameter', () => {
        describe('Type', () => {
            expectType(SwaggerDefinitionConstant.Parameter.Type);
        });
        describe('In', () => {
            it('expect PATH', () => {
                expect(SwaggerDefinitionConstant.Parameter.In.PATH).exist;
            });
            it('expect QUERY', () => {
                expect(SwaggerDefinitionConstant.Parameter.In.QUERY).exist;
            });
            it('expect BODY', () => {
                expect(SwaggerDefinitionConstant.Parameter.In.BODY).exist;
            });
            it('expect FORM_DATA', () => {
                expect(SwaggerDefinitionConstant.Parameter.In.FORM_DATA).exist;
            });
        });
    });

    describe('Response', () => {
        describe('Type', () => {
            expectType(SwaggerDefinitionConstant.Response.Type);
        });
    });

    describe('Security', () => {
        describe('Type', () => {
            it('expect BASIC_AUTHENTICATION', () => {
                expect(
                    SwaggerDefinitionConstant.Security.Type.BASIC_AUTHENTICATION
                ).exist;
            });
            it('expect API_KEY', () => {
                expect(SwaggerDefinitionConstant.Security.Type.API_KEY).exist;
            });
        });
        describe('In', () => {
            it('expect HEADER', () => {
                expect(SwaggerDefinitionConstant.Security.In.HEADER).exist;
            });
            it('expect QUERY', () => {
                expect(SwaggerDefinitionConstant.Security.In.QUERY).exist;
            });
        });
    });
});

function expectType(Type: any) {
    it('expect STRING', () => {
        expect(Type.STRING).exist;
    });
    it('expect NUMBER', () => {
        expect(Type.NUMBER).exist;
    });
    it('expect INTEGER', () => {
        expect(Type.INTEGER).exist;
    });
    it('expect BOOLEAN', () => {
        expect(Type.BOOLEAN).exist;
    });
    it('expect ARRAY', () => {
        expect(Type.ARRAY).exist;
    });
    it('expect OBJECT', () => {
        expect(Type.OBJECT).exist;
    });
}
