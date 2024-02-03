import fs from 'fs';
import path from 'path';

export const rename = async (pathToFile, newFileName) => {
    const pathOfRenamedFile = path.join(process.cwd(), pathToFile);

    try {

      if (
        !fs.existsSync(pathOfRenamedFile)
      ) {
        throw Error(`Path of renamed file: ${pathOfRenamedFile} is wrong`);
      }

      fs.rename(pathOfRenamedFile, newFileName, (err) => {
        if (err) {
            return console.log(err);
        }
      });

    } catch (error) {
      console.log(error.message);
    }

};