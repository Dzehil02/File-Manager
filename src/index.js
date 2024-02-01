import readlinePromises from 'readline/promises';
import {getUsername} from './user/userApi.js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const username = getUsername();
const welcomeMessage = `Welcome to the File Manager, ${username}!`;
const goodbyeMessage = `Thank you for using File Manager, ${username}, goodbye!`;
const pathToWorkingDirectory = `You are currently in ${process.cwd()}`;

console.log(welcomeMessage);
console.log(pathToWorkingDirectory);

const rl = readlinePromises.createInterface({
    input: process.stdin,
    output: process.stdout,
});

rl.on('SIGINT', () => {
    console.log(goodbyeMessage);
    process.exit(0);
  });

rl.on('line', (line) => {

    if (line === '.exit') {
        console.log(goodbyeMessage);
        process.exit(0);
    }

    if (line === 'ls') {
        console.log('YOU WRITTEN LS')
    }

    if (line === 'up') {
        const currentPath = process.cwd();
        console.log(`current path: ${currentPath}`)
        const pathParts = currentPath.split(path.sep);
        console.log(`parts of path: ${pathParts}`)
        if (pathParts.length > 1) {
            pathParts.pop();
            const newPath = pathParts.join(path.sep).endsWith(':') ? pathParts.join(path.sep) + path.sep : pathParts.join(path.sep)
            process.chdir(newPath)
        }
    }

    if (line.startsWith('cd')) {
        try {
            const partOfPathName = line.slice(3);
            const pathToFolder = path.join(process.cwd(), partOfPathName);
            if (!fs.existsSync(pathToFolder)) {
                throw Error(`${partOfPathName} doesn't exist`)
            }
            process.chdir(pathToFolder)
        } catch (error) {
            console.log(error.message)
        }

    }

    console.log(process.cwd())

})


