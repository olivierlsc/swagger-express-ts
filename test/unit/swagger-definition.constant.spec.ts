import { SwaggerDefinitionConstant } from '../../src/swagger-definition.constant';

describe('SwaggerDefinitionConstant', () => {
  describe('Produce', () => {
    it('expect JSON', () => {
      expect(SwaggerDefinitionConstant.Produce.JSON).toBe('application/json');
    });
    it('expect XML', () => {
      expect(SwaggerDefinitionConstant.Produce.XML).toBe('application/xml');
    });
    it('expect ZIP', () => {
      expect(SwaggerDefinitionConstant.Produce.ZIP).toBe('application/zip');
    });
    it('expect PDF', () => {
      expect(SwaggerDefinitionConstant.Produce.PDF).toBe('application/pdf');
    });
    it('expect X_WWW_FORM_URLENCODED', () => {
      expect(SwaggerDefinitionConstant.Produce.X_WWW_FORM_URLENCODED).toBe(
        'application/x-www-form-urlencoded',
      );
    });
    it('expect FORM_DATA', () => {
      expect(SwaggerDefinitionConstant.Produce.FORM_DATA).toBe(
        'multipart/form-data',
      );
    });
    it('expect TEXT_PLAIN', () => {
      expect(SwaggerDefinitionConstant.Produce.TEXT_PLAIN).toBe('text/plain');
    });
    it('expect TEXT_HTML', () => {
      expect(SwaggerDefinitionConstant.Produce.TEXT_HTML).toBe('text/html');
    });
    it('expect PNG', () => {
      expect(SwaggerDefinitionConstant.Produce.PNG).toBe('image/png');
    });
    it('expect GIF', () => {
      expect(SwaggerDefinitionConstant.Produce.GIF).toBe('image/gif');
    });
    it('expect JPEG', () => {
      expect(SwaggerDefinitionConstant.Produce.JPEG).toBe('image/jpeg');
    });
  });

  describe('Scheme', () => {
    it('expect HTTP', () => {
      expect(SwaggerDefinitionConstant.Scheme.HTTP).toBe('http');
    });
    it('expect HTTPS', () => {
      expect(SwaggerDefinitionConstant.Scheme.HTTPS).toBe('https');
    });
  });

  describe('Model', () => {
    describe('Type', () => {
      it('expect OBJECT', () => {
        expect(SwaggerDefinitionConstant.Model.Type.OBJECT).toBe('object');
      });
      it('expect ARRAY', () => {
        expect(SwaggerDefinitionConstant.Model.Type.ARRAY).toBe('array');
      });
    });
    describe('Property', () => {
      describe('Type', () => {
        expectType(SwaggerDefinitionConstant.Model.Property.Type);
      });
      describe('Format', () => {
        it('expect INT_64', () => {
          expect(SwaggerDefinitionConstant.Model.Property.Format.INT_64).toBe(
            'int64',
          );
        });
      });
    });
  });

  describe('Parameter', () => {
    describe('Type', () => {
      expectType(SwaggerDefinitionConstant.Parameter.Type);
    });
    describe('In', () => {
      it('expect HEADER', () => {
        expect(SwaggerDefinitionConstant.Parameter.In.HEADER).toBe('header');
      });
      it('expect PATH', () => {
        expect(SwaggerDefinitionConstant.Parameter.In.PATH).toBe('path');
      });
      it('expect QUERY', () => {
        expect(SwaggerDefinitionConstant.Parameter.In.QUERY).toBe('query');
      });
      it('expect BODY', () => {
        expect(SwaggerDefinitionConstant.Parameter.In.BODY).toBe('body');
      });
      it('expect FORM_DATA', () => {
        expect(SwaggerDefinitionConstant.Parameter.In.FORM_DATA).toBe(
          'formData',
        );
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
          SwaggerDefinitionConstant.Security.Type.BASIC_AUTHENTICATION,
        ).toBe('basic');
      });
      it('expect API_KEY', () => {
        expect(SwaggerDefinitionConstant.Security.Type.API_KEY).toBe('apiKey');
      });
    });
    describe('In', () => {
      it('expect HEADER', () => {
        expect(SwaggerDefinitionConstant.Security.In.HEADER).toBe('header');
      });
      it('expect QUERY', () => {
        expect(SwaggerDefinitionConstant.Security.In.QUERY).toBe('query');
      });
    });
  });
});

function expectType(Type: any) {
  it('expect STRING', () => {
    expect(Type.STRING).toBe('string');
  });
  it('expect NUMBER', () => {
    expect(Type.NUMBER).toBe('number');
  });
  it('expect INTEGER', () => {
    expect(Type.INTEGER).toBe('integer');
  });
  it('expect BOOLEAN', () => {
    expect(Type.BOOLEAN).toBe('boolean');
  });
  it('expect ARRAY', () => {
    expect(Type.ARRAY).toBe('array');
  });
  it('expect OBJECT', () => {
    expect(Type.OBJECT).toBe('object');
  });
}
