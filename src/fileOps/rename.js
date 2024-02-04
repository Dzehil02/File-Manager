import fs from "fs";
import path from "path";
import { INVALID_INPUT, OPERATION_FAILED } from "../const/const.js";

export const rename = async (pathToFile, newFileName) => {
  const pathOfRenamedFile = path.join(process.cwd(), pathToFile);

  try {
    if (!pathToFile || !newFileName) {
      throw Error(INVALID_INPUT);
    }
    if (!fs.existsSync(pathOfRenamedFile)) {
      throw Error(OPERATION_FAILED);
    }

    fs.rename(pathOfRenamedFile, newFileName, (err) => {
      if (err) {
        throw Error(OPERATION_FAILED);
      }
    });
  } catch (error) {
    console.log(error.message);
  }
};
