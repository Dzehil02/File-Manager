import fs from "fs";
import path from "path";
import { OPERATION_FAILED } from "../const/const.js";

export const read = async (pathToFile) => {
  try {
    const pathToReadFile = path.join(process.cwd(), pathToFile);

    if (!fs.existsSync(pathToReadFile)) {
      throw Error(OPERATION_FAILED);
    }

    const readSteam = fs.createReadStream(pathToReadFile);

    readSteam.on("data", (chunk) => {
      console.log(chunk.toString());
    });

    readSteam.on("end", () => {
      console.log(`You are currently in ${process.cwd()}`);
    });

    readSteam.on("error", (error) => {
      console.error(OPERATION_FAILED);
    });
  } catch (error) {
    console.error(error.message);
  }
};
