import fs from "fs";
import path from "path";
import { promisify } from "util";
import { OPERATION_FAILED } from "../const/const.js";

const unlink = promisify(fs.unlink);

export const deleteFile = async (pathToFile) => {
  const pathToFileToRemove = path.join(process.cwd(), pathToFile);

  try {
    if (!fs.existsSync(pathToFileToRemove)) {
      throw Error(OPERATION_FAILED);
    }

    await unlink(pathToFileToRemove);
    
  } catch (error) {
    console.log(error.message);
  }
};
