import fs from "fs";
import path from "path";
import { promisify } from "util";

const unlink = promisify(fs.unlink);

export const deleteFile = async (pathToFile) => {
  const pathToFileToRemove = path.join(process.cwd(), pathToFile);

  try {
    if (!fs.existsSync(pathToFileToRemove)) {
      throw Error(`File on the path: ${pathToFileToRemove} doesn't exist`);
    }

    await unlink(pathToFileToRemove);
    
  } catch (error) {
    console.log(error.message);
  }
};
