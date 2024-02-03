import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const read = async (pathToFile) => {
  try {
    const pathToReadFile = path.join(process.cwd(), pathToFile);

    if (!fs.existsSync(pathToReadFile)) {
      throw Error(`File on the path: ${pathToReadFile} doesn't exist`);
    }

    const readSteam = fs.createReadStream(pathToReadFile);

    readSteam.on("data", (chunk) => {
      console.log(chunk.toString());
    });

    readSteam.on("end", () => {
        console.log(`You are currently in ${process.cwd()}`);
    });

    readSteam.on("error", (error) => {
      console.error("Error reading the file: ", error);
    });
  } catch (error) {
    console.error(error.message);
  }
};
