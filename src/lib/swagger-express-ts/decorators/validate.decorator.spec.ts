import "reflect-metadata";
import * as chai from "chai";
import {
  getProperty,
  NotEmpty,
  Pattern,
  PatternEnum,
  Validate,
  validatePattern
} from "./validate.decorator";

const expect = chai.expect;

describe("Validators", () => {
  interface Inner {
    field: string;
  }

  interface Outer {
    field: string;
    inner?: Inner;
  }

  class TestClass {
    constructor(private uri?: string) {}

    @Validate
    public testValidateURIMethod(
      @Pattern({ pattern: PatternEnum.URI })
      uri: string
    ) {
      expect(uri).to.deep.equal(this.uri);
    }

    @Validate
    public testValidateNotEmptyMethod(@NotEmpty() object: any) {
      expect(object !== null).to.be.true("");
    }
  }

  describe("getProperty", () => {
    const outer: Outer = {
      field: "field outer",
      inner: {
        field: "field inner"
      }
    };

    it("should return undefined from scalar", () => {
      const value = getProperty("field", "field");

      expect(value).to.be.equal(undefined);
    });

    it("should return undefined when fetching nonexisting field", () => {
      const value = getProperty(outer, "inner.field.value");

      expect(value).to.be.equal(undefined);
    });

    it("should find value from outer object", () => {
      const value = getProperty(outer, "field");

      expect(value).to.be.equal("field outer");
    });

    it("should find value from inner object", () => {
      const value = getProperty(outer, "inner.field");

      expect(value).to.be.equal("field inner");
    });
  });

  describe("validatePattern", () => {
    const propertyName = "testProperty";

    // defined tests for matching URI
    // defined tests for matching URI with nullable
    // definde test for matching inside class by path
    describe("URI", () => {
      describe("match a (commonly found) URI", () => {
        const uri =
          "http://user:password@example.com:8080/some/arguments/to/somewhere?search=regex&order=desc#fragment";

        it("should match from string", () => {
          validatePattern(uri, {
            pattern: PatternEnum.URI,
            path: propertyName
          });
        });

        it("should not failed when nullable true and value null", () => {
          validatePattern(null, { pattern: PatternEnum.URI, nullable: true });
        });

        it("should not failed when nullable true and value undefined", () => {
          validatePattern(undefined, {
            pattern: PatternEnum.URI,
            nullable: true
          });
        });

        it("should match from object", () => {
          validatePattern(
            { field: uri },
            {
              pattern: PatternEnum.URI,
              path: "field"
            }
          );
        });

        it("should match from object's inner field", () => {
          validatePattern(
            { field: null, inner: { field: uri } },
            { pattern: PatternEnum.URI, path: "inner.field" }
          );
        });

        it("should not fail when object's inner field not set with nullable", () => {
          validatePattern(
            { field: null, inner: { field: null } },
            { pattern: PatternEnum.URI, path: "inner.field", nullable: true }
          );
        });

        it("should fail when object's inner field not set", () => {
          expect(() => {
            validatePattern(
              { field: null, inner: { field: null } },
              { pattern: PatternEnum.URI, path: "inner.field" }
            );
          }).to.throw("inner.field has to be valid URI");
        });
      });

      it("should match URIs with Pattern as hostname", () => {
        const uri = "mina:tcp://mainframeip:4444?textline=true";

        validatePattern(uri, {
          pattern: PatternEnum.URI,
          path: propertyName
        });
      });

      it("should match IPv6 hosts", () => {
        const uri = "ldap://[2001:db8::7]/c=GB?objectClass?one";

        validatePattern(uri, {
          pattern: PatternEnum.URI,
          path: propertyName
        });
      });

      it("should match URIs w/o authority", () => {
        const uri = "urn:oasis:names:specification:docbook:dtd:xml:4.1.2";

        validatePattern(uri, {
          pattern: PatternEnum.URI,
          path: propertyName
        });
      });

      it("should match unicode hostnames", () => {
        const uri = "https://www.日本平.jp";

        validatePattern(uri, {
          pattern: PatternEnum.URI,
          path: propertyName
        });
      });

      it("should match punycode hostnames", () => {
        const uri = "http://www.xn--gwtq9nb2a.jp";

        validatePattern(uri, {
          pattern: PatternEnum.URI,
          path: propertyName
        });
      });

      it("should match percent encoded parts", () => {
        const uri = "http://www.fran%c3%a7ois.fr/fran%c3%a7ois";

        validatePattern(uri, {
          pattern: PatternEnum.URI,
          path: propertyName
        });
      });

      it("should match RFC 3986's example URIs", () => {
        const uri = "ftp://ftp.is.co.za/rfc/rfc1808.txt";

        validatePattern(uri, {
          pattern: PatternEnum.URI,
          path: propertyName
        });
      });

      it("http://www.ietf.org/rfc/rfc2396.txt", () => {
        const uri = "http://www.ietf.org/rfc/rfc2396.txt";

        validatePattern(uri, {
          pattern: PatternEnum.URI,
          path: propertyName
        });
      });

      it("mailto:John.Doe@example.com", () => {
        const uri = "mailto:John.Doe@example.com";

        validatePattern(uri, {
          pattern: PatternEnum.URI,
          path: propertyName
        });
      });

      it("news:comp.infosystems.www.servers.unix", () => {
        const uri = "news:comp.infosystems.www.servers.unix";

        validatePattern(uri, {
          pattern: PatternEnum.URI,
          path: propertyName
        });
      });

      it("tel:+1-816-555-1212", () => {
        const uri = "tel:+1-816-555-1212";

        validatePattern(uri, {
          pattern: PatternEnum.URI,
          path: propertyName
        });
      });

      it("telnet://192.0.2.16:80/", () => {
        const uri = "telnet://192.0.2.16:80/";

        validatePattern(uri, {
          pattern: PatternEnum.URI,
          path: propertyName
        });
      });

      it("should fail", () => {
        const uri = "localhost";

        expect(() => {
          validatePattern(uri, {
            pattern: PatternEnum.URI,
            path: propertyName
          });
        }).to.throw("testProperty has to be valid URI");
      });
    });

    describe("HOST", () => {
      it("should fail when http prefix defined", () => {
        expect(() => {
          validatePattern("http://www.test.com", {
            pattern: PatternEnum.HOST,
            path: propertyName
          });
        }).to.throw("testProperty has to be valid HOST");
      });

      it("should fail when / path defined", () => {
        expect(() => {
          validatePattern("www.test.com/", {
            pattern: PatternEnum.HOST,
            path: propertyName
          });
        }).to.throw("testProperty has to be valid HOST");
      });

      it("should fail when /custom/path path defined", () => {
        expect(() => {
          validatePattern("www.test.com/custom/path", {
            pattern: PatternEnum.HOST,
            path: propertyName
          });
        }).to.throw("testProperty has to be valid HOST");
      });

      it("should pass when localhost defined", () => {
        validatePattern("localhost", { pattern: PatternEnum.HOST });
      });

      it("should pass when www.test.com defined", () => {
        validatePattern("www.test.com", { pattern: PatternEnum.HOST });
      });

      it("should pass when www.test.com:8080 defined", () => {
        validatePattern("www.test.com:8080", { pattern: PatternEnum.HOST });
      });
    });

    describe("EMAIL", () => {
      it("should fail when invalid mail", () => {
        expect(() => {
          validatePattern("mail", {
            pattern: PatternEnum.EMAIL,
            path: propertyName
          });
        }).to.throw("testProperty has to be valid EMAIL");
      });

      it("should pass when test@test.test", () => {
        validatePattern("test@test.test", { pattern: PatternEnum.EMAIL });
      });
    });
  });

  describe("Pattern", () => {
    it("should match a (commonly found) URI", () => {
      const uri =
        "http://user:password@example.com:8080/some/arguments/to/somewhere?search=regex&order=desc#fragment";
      const testClass = new TestClass(uri);

      testClass.testValidateURIMethod(uri);
    });

    it("should fail with localhost", () => {
      const uri = "localhost";
      const testClass = new TestClass(uri);

      expect(() => {
        testClass.testValidateURIMethod(uri);
      }).to.throw("localhost has to be valid URI");
    });

    it("should fail when empty", () => {
      const testClass = new TestClass(null);

      expect(() => {
        testClass.testValidateURIMethod(null);
      }).to.throw("Validated property is empty. Has to be valid URI");
    });

    it("should fail when undefined", () => {
      const testClass = new TestClass(undefined);

      expect(() => {
        testClass.testValidateURIMethod(undefined);
      }).to.throw("Validated property is empty. Has to be valid URI");
    });
  });

  describe("NotEmpty", () => {
    it("should fail when empty object passed", () => {
      const testClass = new TestClass();
      expect(() => {
        testClass.testValidateNotEmptyMethod({});
      }).to.throw("Cannot be empty");
    });
  });
});
