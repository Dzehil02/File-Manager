import readlinePromises from "readline/promises";
import { getUsername } from "./user/userApi.js";
import { showList } from "./dirNav/ls.js";
import { upDir } from "./dirNav/up.js";
import { goToTheDir } from "./dirNav/cd.js";
import { create } from "./fileOps/create.js";
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

  getPathToCurrentDirectory();
});
