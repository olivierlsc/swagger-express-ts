import "reflect-metadata";
import * as chai from "chai";
import {
  getProperty,
  URI,
  Validate,
  validateURIPattern
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

  describe("validateURIPattern", () => {
    const propertyName = "testProperty";

    describe("match a (commonly found) URI", () => {
      const uri =
        "http://user:password@example.com:8080/some/arguments/to/somewhere?search=regex&order=desc#fragment";

      it("should match from string", () => {
        validateURIPattern(uri, {
          path: propertyName
        });
      });

      it("should not failed when nullable true and value null", () => {
        validateURIPattern(null, { nullable: true });
      });

      it("should not failed when nullable true and value undefined", () => {
        validateURIPattern(undefined, { nullable: true });
      });

      it("should match from object", () => {
        validateURIPattern(
          { field: uri },
          {
            path: "field"
          }
        );
      });

      it("should match from object's inner field", () => {
        validateURIPattern(
          { field: null, inner: { field: uri } },
          { path: "inner.field" }
        );
      });

      it("should not fail when object's inner field not set with nullable", () => {
        validateURIPattern(
          { field: null, inner: { field: null } },
          { path: "inner.field", nullable: true }
        );
      });

      it("should fail when object's inner field not set", () => {
        expect(() => {
          validateURIPattern(
            { field: null, inner: { field: null } },
            { path: "inner.field" }
          );
        }).to.throw("inner.field has to be valid URI");
      });
    });

    it("should match URIs with URI as hostname", () => {
      const uri = "mina:tcp://mainframeip:4444?textline=true";

      validateURIPattern(uri, {
        path: propertyName
      });
    });

    it("should match IPv6 hosts", () => {
      const uri = "ldap://[2001:db8::7]/c=GB?objectClass?one";

      validateURIPattern(uri, {
        path: propertyName
      });
    });

    it("should match URIs w/o authority", () => {
      const uri = "urn:oasis:names:specification:docbook:dtd:xml:4.1.2";

      validateURIPattern(uri, {
        path: propertyName
      });
    });

    it("should match unicode hostnames", () => {
      const uri = "https://www.日本平.jp";

      validateURIPattern(uri, {
        path: propertyName
      });
    });

    it("should match punycode hostnames", () => {
      const uri = "http://www.xn--gwtq9nb2a.jp";

      validateURIPattern(uri, {
        path: propertyName
      });
    });

    it("should match percent encoded parts", () => {
      const uri = "http://www.fran%c3%a7ois.fr/fran%c3%a7ois";

      validateURIPattern(uri, {
        path: propertyName
      });
    });

    it("should match RFC 3986's example URIs", () => {
      const uri = "ftp://ftp.is.co.za/rfc/rfc1808.txt";

      validateURIPattern(uri, {
        path: propertyName
      });
    });

    it("http://www.ietf.org/rfc/rfc2396.txt", () => {
      const uri = "http://www.ietf.org/rfc/rfc2396.txt";

      validateURIPattern(uri, {
        path: propertyName
      });
    });

    it("mailto:John.Doe@example.com", () => {
      const uri = "mailto:John.Doe@example.com";

      validateURIPattern(uri, {
        path: propertyName
      });
    });

    it("news:comp.infosystems.www.servers.unix", () => {
      const uri = "news:comp.infosystems.www.servers.unix";

      validateURIPattern(uri, {
        path: propertyName
      });
    });

    it("tel:+1-816-555-1212", () => {
      const uri = "tel:+1-816-555-1212";

      validateURIPattern(uri, {
        path: propertyName
      });
    });

    it("telnet://192.0.2.16:80/", () => {
      const uri = "telnet://192.0.2.16:80/";

      validateURIPattern(uri, {
        path: propertyName
      });
    });

    it("should fail", () => {
      const uri = "localhost";

      expect(() => {
        validateURIPattern(uri, {
          path: propertyName
        });
      }).to.throw("testProperty has to be valid URI");
    });
  });

  describe("URI", () => {
    class TestURI {
      constructor(private uri: string) {}

      @Validate
      public testMethod(@URI() uri: string) {
        expect(uri).to.deep.equal(this.uri);
      }
    }

    it("should match a (commonly found) URI", () => {
      const uri =
        "http://user:password@example.com:8080/some/arguments/to/somewhere?search=regex&order=desc#fragment";
      const testClass = new TestURI(uri);

      testClass.testMethod(uri);
    });

    it("should fail with localhost", () => {
      const uri = "localhost";
      const testClass = new TestURI(uri);

      expect(() => {
        testClass.testMethod(uri);
      }).to.throw("localhost has to be valid URI");
    });

    it("should fail when empty", () => {
      const testClass = new TestURI(null);

      expect(() => {
        testClass.testMethod(null);
      }).to.throw("Validated property is empty. Has to be valid URI");
    });

    it("should fail when undefined", () => {
      const testClass = new TestURI(undefined);

      expect(() => {
        testClass.testMethod(undefined);
      }).to.throw("Validated property is empty. Has to be valid URI");
    });
  });
});
