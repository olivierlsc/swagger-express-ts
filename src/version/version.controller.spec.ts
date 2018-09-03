import * as chai from "chai";
import {VersionController} from "./version.controller";
import {VersionsService} from "./versions.service";
import * as express from "express";
import * as sinon from "sinon";
import {VersionModel} from "./version.model";

const expect = chai.expect;

describe("VersionController", () => {
    let versionController: VersionController;
    let versionsService: VersionsService;

    beforeEach(() => {
        versionsService = {} as any;
        versionController = new VersionController(versionsService);
    });

    describe("getVersion", () => {
        it("expect version", () => {
            const request: express.Request = {} as any;
            const response: express.Response = {} as any;
            const next: express.NextFunction = {} as any;
            const id: string = "1";
            const version: VersionModel = {} as any;
            const versionsServiceGetVersionByIdStub = sinon.stub().returns(version);
            versionsService.getVersionById = versionsServiceGetVersionByIdStub;
            const responseJsonSpy = sinon.spy();
            response.json = responseJsonSpy;

            versionController.getVersion(id, request, response, next);

            expect(versionsServiceGetVersionByIdStub.called).is.true;
            expect(responseJsonSpy.calledWith(version)).is.true;
        });
    });
});
