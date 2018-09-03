import * as chai from "chai";
import {VersionsController} from "./versions.controller";
import {VersionsService} from "./versions.service";
import * as express from "express";
import * as sinon from "sinon";
import {VersionModel} from "./version.model";

const expect = chai.expect;

describe("VersionsController", () => {
    let versionsController: VersionsController;
    let versionsService: VersionsService;

    beforeEach(() => {
        versionsService = {} as any;
        versionsController = new VersionsController(versionsService);
    });
    describe("GET:/versions", () => {
        it("expect version list", () => {
            const request: express.Request = {} as any;
            const response: express.Response = {} as any;
            const next: express.NextFunction = {} as any;
            const versionList: VersionModel[] = [];
            const versionsServiceGetVersionsStub = sinon.stub().returns(versionList);
            versionsService.getVersions = versionsServiceGetVersionsStub;
            const responseJsonSpy = sinon.spy();
            response.json = responseJsonSpy;

            versionsController.getVersions(request, response, next);

            expect(versionsServiceGetVersionsStub.called).is.true;
            expect(responseJsonSpy.calledWith(versionList)).is.true;
        });
    });

    describe("POST:/versions", () => {
        it("expect post version", () => {
            const request: express.Request = {} as any;
            const response: express.Response = {} as any;
            const next: express.NextFunction = {} as any;
            const version: VersionModel = {} as any;
            const versionsServiceAddVersionStub = sinon.stub().returns(version);
            versionsService.addVersion = versionsServiceAddVersionStub;
            const responseJsonSpy = sinon.spy();
            response.json = responseJsonSpy;
            request.body = {};

            versionsController.postVersion(request, response, next);

            expect(versionsServiceAddVersionStub.calledWith(request.body)).is.true;
            expect(responseJsonSpy.calledWith(version)).is.true;
        });
    });
});
