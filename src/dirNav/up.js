import path from 'path';
import { OPERATION_FAILED } from '../const/const.js';

export const upDir = () => {
    try {
        const currentPath = process.cwd();
        const pathParts = currentPath.split(path.sep);
        if (pathParts.length > 1) {
          pathParts.pop();
          const newPath = path.join("..");
          process.chdir(newPath);
        }
      } catch (error) {
        console.error(OPERATION_FAILED);
      }
}