import fs from "fs";
import path from "path";
import { deleteFile } from "./delete.js";
import { OPERATION_FAILED } from "../const/const.js";
import { getPathToCurrentDirectory } from "../api/api.js";

export const move = async (pathToFile, pathToNewDirectory) => {
  try {
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

    readSteam.on("end", () => {
      deleteFile(pathToFile);
      getPathToCurrentDirectory();
    });

    readSteam.on("error", (error) => {
      console.error("Error reading the file: ", error);
    });

    writeStream.on("error", (error) => {
      console.error("Error writing the file: ", error);
    });
  } catch (error) {
    console.log(error.message);
  }
};
