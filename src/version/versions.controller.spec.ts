import * as chai from 'chai';
import { VersionsController } from './versions.controller';
import { VersionsService } from './versions.service';
const expect = chai.expect;
import * as express from 'express';
import * as sinon from 'sinon';
import { VersionModel } from './version.model';

describe('VersionsController', () => {
    let versionsController: VersionsController;
    let versionsService: VersionsService;

    beforeEach(() => {
        versionsService = {} as VersionsService;
        versionsController = new VersionsController(versionsService);
    });
    describe('GET:/versions', () => {
        it('expect version list', () => {
            let request: express.Request;
            let response: express.Response = {} as express.Response;
            let next: express.NextFunction;
            let versionList: VersionModel[] = [];
            let versionsServiceGetVersionsStub = sinon
                .stub()
                .returns(versionList);
            versionsService.getVersions = versionsServiceGetVersionsStub;
            let responseJsonSpy = sinon.spy();
            response.json = responseJsonSpy;

            versionsController.getVersions(request, response, next);

            expect(versionsServiceGetVersionsStub.called).is.true;
            expect(responseJsonSpy.calledWith(versionList)).is.true;
        });
    });

    describe('POST:/versions', () => {
        it('expect post version', () => {
            let request: express.Request = {} as express.Request;
            let response: express.Response = {} as express.Response;
            let next: express.NextFunction;
            let version: VersionModel = {} as VersionModel;
            let versionsServiceAddVersionStub = sinon.stub().returns(version);
            versionsService.addVersion = versionsServiceAddVersionStub;
            let responseJsonSpy = sinon.spy();
            response.json = responseJsonSpy;
            request.body = {};

            versionsController.postVersion(request, response, next);

            expect(versionsServiceAddVersionStub.calledWith(request.body)).is
                .true;
            expect(responseJsonSpy.calledWith(version)).is.true;
        });
    });
});
