import { injectable } from "inversify";
import "reflect-metadata";
import { VersionModel } from "./version.model";
import * as _ from "lodash";

@injectable()
export class VersionsService {
  public static TARGET_NAME: string = "VersionsService";
  private versionList: VersionModel[] = [
    {
      id: "1",
      name: "Version 1",
      description: "Description Version 1",
      author: {
        id: "1",
        name: ["John DOE"]
      }
    },
    {
      id: "2",
      name: "Version 2",
      description: "Description Version 2",
      author: {
        id: "1",
        name: ["John DOE"]
      }
    }
  ];

  public getVersions(): VersionModel[] {
    return this.versionList;
  }

  public addVersion(version: VersionModel): VersionModel {
    this.versionList.push(version);
    return version;
  }

  public getVersionById(id: string): VersionModel {
    return _.find(this.versionList, (version: VersionModel) => {
      return _.isEqual(version.id, id);
    });
  }
}
