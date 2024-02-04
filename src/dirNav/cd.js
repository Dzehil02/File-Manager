import path from 'path';
import fs from 'fs';
import { OPERATION_FAILED } from '../const/const.js';

export const goToTheDir = (pathToDirectory) => {
    try {
        const absolutePath = path.resolve(process.cwd(), pathToDirectory);
        if (!fs.existsSync(absolutePath)) {
          throw Error(OPERATION_FAILED);
        }
        process.chdir(absolutePath);
      } catch (error) {
        console.log(error.message);
      }
}