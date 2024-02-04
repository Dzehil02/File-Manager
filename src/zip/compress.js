import { createBrotliCompress } from "zlib";
import fs from "fs";
import { INVALID_INPUT, OPERATION_FAILED } from "../const/const.js";

export const compress = async (file, pathToDestination) => {
  try {
    if (!file || !pathToDestination) {
      throw Error(INVALID_INPUT);
    }
    if (!fs.existsSync(file)) {
      throw Error(OPERATION_FAILED);
    }

    const readStream = fs.createReadStream(file);
    const writeStream = fs.createWriteStream(pathToDestination);
    const brotliZip = createBrotliCompress();
    const stream = readStream.pipe(brotliZip).pipe(writeStream);

    stream.on("finish", () => {
      console.log(`Done compressing file: ${pathToDestination}`);
    });
  } catch (error) {
    console.log(error.message);
  }
};
