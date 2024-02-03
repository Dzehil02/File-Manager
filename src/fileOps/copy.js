import fs from "fs";
import path from "path";
import { promisify } from "util";

const mkdir = promisify(fs.mkdir);

export const copy = async (pathToFile, pathToNewDirectory) => {
  try {
    if (!fs.existsSync(pathToFile)) {
      throw Error(`File on the path: ${pathToFile} doesn't exist`);
    }
    if (!fs.existsSync(pathToNewDirectory)) {
      await mkdir(pathToNewDirectory);
    }

    const writeDirectory = path.join(
      pathToNewDirectory,
      path.basename(pathToFile)
    );

    const readSteam = fs.createReadStream(pathToFile);
    const writeStream = fs.createWriteStream(writeDirectory);

      readSteam.pipe(writeStream);

      readSteam.on('error', (error) => {
        console.error('Error reading the file: ', error);
      });

      writeStream.on('error', (error) => {
        console.error('Error writing the file: ', error);
      });

  } catch (error) {
    console.log(error.message);
  }
};
