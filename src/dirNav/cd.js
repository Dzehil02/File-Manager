import path from 'path';
import fs from 'fs';

export const goToTheDir = (partOfPathName) => {
    try {
        const pathToFolder = path.join(process.cwd(), partOfPathName);
        if (!fs.existsSync(pathToFolder)) {
          throw Error(`${partOfPathName} doesn't exist`);
        }
        process.chdir(pathToFolder);
      } catch (error) {
        console.log(error.message);
      }
}