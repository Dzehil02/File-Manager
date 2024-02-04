import fs from "fs";
import path from "path";
import { OPERATION_FAILED } from "../const/const.js";

export const rename = async (pathToFile, newFileName) => {
  const pathOfRenamedFile = path.join(process.cwd(), pathToFile);

  try {
    if (!fs.existsSync(pathOfRenamedFile)) {
      throw Error(OPERATION_FAILED);
    }

    fs.rename(pathOfRenamedFile, newFileName, (err) => {
      if (err) {
        return console.log(err.message);
      }
    });
  } catch (error) {
    console.log(error.message);
  }
};
