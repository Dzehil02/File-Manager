import readlinePromises from "readline/promises";
import { welcomeMessage, goodbyeMessage } from "./api/userApi.js";
import { showList } from "./dirNav/ls.js";
import { upDir } from "./dirNav/up.js";
import { goToTheDir } from "./dirNav/cd.js";
import { create } from "./fileOps/create.js";
import { deleteFile } from "./fileOps/delete.js";
import { rename } from "./fileOps/rename.js";
import { copy } from "./fileOps/copy.js";
import { move } from "./fileOps/move.js";
import { read } from "./fileOps/read.js";
import { calculateHash } from "./hash/calcHash.js";
import { compress } from "./zip/compress.js";
import { decompress } from "./zip/decompress.js";
import {getOsInfo} from './os/os.js';
import { getPathToCurrentDirectory } from "./api/api.js";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);



console.log(welcomeMessage);
getPathToCurrentDirectory();

const rl = readlinePromises.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.on("SIGINT", () => {
  console.log(goodbyeMessage);
  process.exit(0);
});

rl.on("line", (line) => {
  if (line === ".exit") {
    console.log(goodbyeMessage);
    process.exit(0);
  }

  if (line === "ls") {
    showList();
  }

  if (line === "up") {
    upDir();
  }

  if (line.startsWith("cd")) {
    const pathToDirectory = line.slice(3);
    goToTheDir(pathToDirectory);
  }

  if (line.startsWith("add")) {
    const fileName = line.slice(4);
    console.log(line.split(' '))
    create(fileName);
  }

  if (line.startsWith("rm")) {
    const fileName = line.slice(3);
    deleteFile(fileName);
  }

  if (line.startsWith("rn")) {
    const args = line.split(" ");
    const [_, pathToFile, newFilename] = args;
    rename(pathToFile, newFilename);
  }

  if (line.startsWith("cp")) {
    const args = line.split(" ");
    const [_, pathToFile, pathToNewDirectory] = args;
    copy(pathToFile, pathToNewDirectory);
  }

  if (line.startsWith("mv")) {
    const args = line.split(" ");
    const [_, pathToFile, pathToNewDirectory] = args;
    move(pathToFile, pathToNewDirectory);
  }

  if (line.startsWith("cat")) {
    const pathToFile = line.slice(4);
    read(pathToFile);
  }

  if (line.startsWith("hash")) {
    const pathToFile = line.slice(5);
    calculateHash(pathToFile);
  }

  if (line.startsWith("compress")) {
    const args = line.split(" ");
    const [_, pathToFile, pathToDestination] = args;
    compress(pathToFile, pathToDestination);
  }

  if (line.startsWith("decompress")) {
    const args = line.split(" ");
    const [_, pathToFile, pathToDestination] = args;
    decompress(pathToFile, pathToDestination);
  }

  if (line.startsWith("os")) {
    const args = line.split(" ");
    const [_, flag] = args;
    getOsInfo(flag);
  }

  // функция для проверки переданных аргументов. Не забыть удалить!!!!
  if (line.startsWith("ch")) {
    const args = line.split(" ");
    console.log(args);
  }

  getPathToCurrentDirectory();
});
