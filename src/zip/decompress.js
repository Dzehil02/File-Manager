import { createBrotliDecompress } from "zlib";
import fs from "fs";

export const decompress = async (file, pathToDestination) => {
  try {
    if (!fs.existsSync(file)) {
      throw Error(`File on the path: ${file} doesn't exist`);
    }
    const readStream = fs.createReadStream(file);
    const writeStream = fs.createWriteStream(pathToDestination);
    const brotliUnZip = createBrotliDecompress();
    const stream = readStream.pipe(brotliUnZip).pipe(writeStream);

    stream.on("finish", () => {
      console.log(`Done decompressing file: ${pathToDestination}`);
    });
  } catch (error) {
    console.log(error.message);
  }
};
