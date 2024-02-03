import { createBrotliCompress } from "zlib";
import fs from "fs";

export const compress = async (file, pathToDestination) => {
  try {
    if (!fs.existsSync(file)) {
      throw Error(`File on the path: ${file} doesn't exist`);
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
