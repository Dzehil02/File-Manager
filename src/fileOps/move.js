import fs from 'fs';
import path from 'path';
import { deleteFile } from './delete.js';
import { INVALID_INPUT, OPERATION_FAILED } from '../const/const.js';

export const move = async (pathToFile, pathToNewDirectory) => {
    try {
        if (!pathToFile || !pathToNewDirectory) {
            throw Error(INVALID_INPUT);
        }
        if (!fs.existsSync(pathToFile)) {
            throw Error(OPERATION_FAILED);
        }
        if (!fs.existsSync(pathToNewDirectory)) {
            throw Error(OPERATION_FAILED);
        }

        const writeDirectory = path.join(
            pathToNewDirectory,
            path.basename(pathToFile)
        );

        const readSteam = fs.createReadStream(pathToFile);
        const writeStream = fs.createWriteStream(writeDirectory);

        readSteam.pipe(writeStream);

        readSteam.on('end', () => {
            deleteFile(pathToFile);
        });

        readSteam.on('error', () => {
            console.error(OPERATION_FAILED);
        });

        writeStream.on('error', () => {
            console.error(OPERATION_FAILED);
        });
    } catch (error) {
        console.log(error.message);
    }
};
