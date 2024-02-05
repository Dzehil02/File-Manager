import { createBrotliDecompress } from 'zlib';
import fs from 'fs';
import { INVALID_INPUT, OPERATION_FAILED } from '../const/const.js';

export const decompress = async (file, pathToDestination) => {
    try {
        if (!file || !pathToDestination) {
            throw Error(INVALID_INPUT);
        }
        if (!fs.existsSync(file)) {
            throw Error(OPERATION_FAILED);
        }

        const readStream = fs.createReadStream(file);
        const writeStream = fs.createWriteStream(pathToDestination);
        const brotliUnZip = createBrotliDecompress();
        const stream = readStream.pipe(brotliUnZip).pipe(writeStream);

        stream.on('finish', () => {
            console.log(`Done decompressing file: ${pathToDestination}`);
        });
    } catch (error) {
        console.log(error.message);
    }
};
