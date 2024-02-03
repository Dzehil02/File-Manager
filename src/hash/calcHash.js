import fs from "fs";
import { createHash } from "crypto";
import path from "path";

export const calculateHash = async (file) => {
  try {
    const pathToFile = path.join(process.cwd(), file);

    if (!fs.existsSync(pathToFile)) {
      throw Error(`File on the path: ${pathToFile} doesn't exist`);
    }

    const readSteam = fs.createReadStream(pathToFile);

    readSteam.on("data", (chunk) => {
      const hash = createHash("sha256").update(chunk).digest("hex");
      console.log(hash);
    });
  } catch (error) {
    console.log(error.message);
  }
};
