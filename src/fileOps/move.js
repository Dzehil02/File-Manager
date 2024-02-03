import fs from "fs";
import path from "path";
import { promisify } from "util";
import {deleteFile} from './delete.js';

const mkdir = promisify(fs.mkdir);

export const move = async (pathToFile, pathToNewDirectory) => {

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

      readSteam.on('end', (error) => {
        deleteFile(pathToFile);
        console.log(`You are currently in ${process.cwd()}`);
      })

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
