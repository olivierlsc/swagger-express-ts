import "reflect-metadata";
import "../../test/resources/extend.entity";
import { SwaggerService } from "./swagger.service";

import * as chai from "chai";
const expect = chai.expect;

describe("es-mapping unit:test", () => {
  it("Extend definition must be created", () => {
    const definition = SwaggerService.getInstance().getData().definitions;
    expect(definition.Extend).to.exist;
  });

  it("Extend definition must be created", () => {
    const definition = SwaggerService.getInstance().getData().definitions;
    expect(definition.Extend.description).to.equal("Extend description");
    expect(definition.Extend.properties).to.exist;
    expect(definition.Extend.properties.extendNumber).to.exist;
    expect(definition.Extend.properties.mainNumber).to.exist;
    expect(definition.Extend.properties.mainNumber.description).to.equal(
      "extend main name"
    );
    expect(definition.Extend.properties.mainName).to.exist;
    expect(definition.Extend.properties.mainName.description).to.equal(
      "main name description"
    );
  });
});
