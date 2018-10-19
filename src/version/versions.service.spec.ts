import * as chai from 'chai';
import { VersionsService } from './versions.service';
import { VersionModel } from './version.model';
const expect = chai.expect;

describe('VersionsService', () => {
    let versionsService: VersionsService;

    beforeEach(() => {
        versionsService = new VersionsService();
    });

    describe('getVersions', () => {
        it('expect version list', () => {
            let versions = versionsService.getVersions();

            expect(versions).exist;
        });
    });

    describe('addVersion', () => {
        it('expect new version', () => {
            let newVersion: VersionModel = {} as VersionModel;
            let lengthBeforeAddVersion = versionsService.getVersions().length;

            let version = versionsService.addVersion(newVersion);

            expect(version).exist;
            let lengthAfterAddVersion = versionsService.getVersions().length;
            expect(lengthBeforeAddVersion < lengthAfterAddVersion).is.true;
        });
    });

    describe('getVersionById', () => {
        it('expect version by id', () => {
            let version = versionsService.getVersionById('1');

            expect(version).exist;
        });
    });
});
