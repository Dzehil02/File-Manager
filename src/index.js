import readlinePromises from "readline/promises";
import { getUsername } from "./user/userApi.js";
import { showList } from "./dirNav/ls.js";
import { upDir } from "./dirNav/up.js";
import { goToTheDir } from "./dirNav/cd.js";
import { create } from "./fileOps/create.js";
import { deleteFile } from "./fileOps/delete.js";
import { rename } from "./fileOps/rename.js";
import { copy } from "./fileOps/copy.js";
import { move } from "./fileOps/move.js";
import { read } from "./fileOps/read.js";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const username = getUsername();
const welcomeMessage = `Welcome to the File Manager, ${username}!`;
const goodbyeMessage = `Thank you for using File Manager, ${username}, goodbye!`;
const getPathToCurrentDirectory = () =>
  console.log(`You are currently in ${process.cwd()}`);

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
    const partOfPathName = line.slice(3);
    goToTheDir(partOfPathName);
  }

  if (line.startsWith("add")) {
    const fileName = line.slice(4);
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

  getPathToCurrentDirectory();
});
