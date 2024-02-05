import fs from 'fs';
import path from 'path';
import { INVALID_INPUT, OPERATION_FAILED } from '../const/const.js';
import { getPathToCurrentDirectory } from '../api/api.js';

export const read = async (pathToFile) => {
    try {
        const absolutePath = path.resolve(process.cwd(), pathToFile);

        if (!pathToFile) {
            throw Error(INVALID_INPUT);
        }
        if (!fs.existsSync(absolutePath)) {
            throw Error(OPERATION_FAILED);
        }

        const readSteam = fs.createReadStream(absolutePath);

        readSteam.on('data', (chunk) => {
            console.log(chunk.toString());
        });

        readSteam.on('end', () => {
            getPathToCurrentDirectory();
        });

        readSteam.on('error', () => {
            console.error(OPERATION_FAILED);
        });
    } catch (error) {
        console.error(error.message);
    }
};
