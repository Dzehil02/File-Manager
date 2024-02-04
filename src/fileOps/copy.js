import fs from "fs";
import path from "path";
import { OPERATION_FAILED } from "../const/const.js";


export const copy = async (pathToFile, pathToNewDirectory) => {
  try {
    if (fs.statSync(pathToFile).isDirectory()) {
      throw Error(OPERATION_FAILED);
    }
    if (!fs.existsSync(pathToFile)) {
      throw Error(OPERATION_FAILED);
    }
    if (!fs.existsSync(pathToNewDirectory)) {
      throw Error(OPERATION_FAILED);
    }

    const writeDirectory = path.join(
      pathToNewDirectory,
      path.basename(pathToFile)
    );

    const readSteam = fs.createReadStream(pathToFile);
    const writeStream = fs.createWriteStream(writeDirectory);

    readSteam.pipe(writeStream);

    readSteam.on("error", (error) => {
      console.error("Error reading the file: ", error.message);
    });

    writeStream.on("error", (error) => {
      console.error("Error writing the file: ", error.message);
    });
  } catch (error) {
    console.log(error.message);
  }
};
