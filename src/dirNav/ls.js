import fs from "fs";
import { getPathToCurrentDirectory } from "../api/api.js";
import { OPERATION_FAILED } from "../const/const.js";

export const showList = async () => {
  const pathToFiles = process.cwd();
  const structDatas = [];

  try {
    if (!fs.existsSync(pathToFiles)) {
      throw Error(OPERATION_FAILED);
    }

    fs.readdir(pathToFiles, { withFileTypes: true }, (err, files) => {
      if (err) {
        return console.log(err);
      }

      files.forEach((file) => {
        let obj = {
          Name: file.name,
          Type: file.isDirectory() ? "directory" : "file",
        };
        structDatas.push(obj);
      });

      structDatas.sort((a, b) => {
        if (a.Type > b.Type) return 1;
        if (a.Type < b.Type) return -1;
        if (a.Name > b.Name) return 1;
        if (a.Name < b.Name) return -1;
        return 0;
      });
      console.table(structDatas);
      getPathToCurrentDirectory();
    });
  } catch (error) {
    console.log(error.message);
  }
};
