import * as chai from "chai";
import {VersionsService} from "./versions.service";
import {VersionModel} from "./version.model";

const expect = chai.expect;

describe("VersionsService", () => {
    let versionsService: VersionsService;

    beforeEach(() => {
        versionsService = new VersionsService();
    });

    describe("getVersions", () => {
        it("expect version list", () => {
            const versions = versionsService.getVersions();

            expect(versions).exist;
        });
    });

    describe("addVersion", () => {
        it("expect new version", () => {
            const newVersion: VersionModel = {} as any;
            const lengthBeforeAddVersion = versionsService.getVersions().length;

            const version = versionsService.addVersion(newVersion);

            expect(version).exist;
            const lengthAfterAddVersion = versionsService.getVersions().length;
            expect(lengthBeforeAddVersion < lengthAfterAddVersion).is.true;
        });
    });

    describe("getVersionById", () => {
        it("expect version by id", () => {
            const version = versionsService.getVersionById("1");

            expect(version).exist;
        });
    });
});
