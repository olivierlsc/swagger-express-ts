import * as chai from "chai";
import { VersionController } from "./version.controller";
import { VersionsService } from "./versions.service";
const expect = chai.expect;
import * as express from "express";
import * as sinon from "sinon";
import { VersionModel } from "./version.model";

describe("VersionController", () => {
  let versionController: VersionController;
  let versionsService: VersionsService;

  beforeEach(() => {
    versionsService = {} as VersionsService;
    versionController = new VersionController(versionsService);
  });

  describe("getVersion", () => {
    it("expect version", () => {
      let request: express.Request;
      let response: express.Response = {} as express.Response;
      let next: express.NextFunction;
      let id: string = "1";
      let version: VersionModel = {} as VersionModel;
      let versionsServiceGetVersionByIdStub = sinon.stub().returns(version);
      versionsService.getVersionById = versionsServiceGetVersionByIdStub;
      let responseJsonSpy = sinon.spy();
      response.json = responseJsonSpy;

      versionController.getVersion(id, request, response, next);

      expect(versionsServiceGetVersionByIdStub.called).is.true;
      expect(responseJsonSpy.calledWith(version)).is.true;
    });
  });
});
