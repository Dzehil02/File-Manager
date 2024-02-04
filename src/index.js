import readlinePromises from "readline/promises";
import { welcomeMessage, goodbyeMessage } from "./api/userApi.js";
import { getPathToCurrentDirectory } from "./api/api.js";
import {handleLine} from './api/api.js';

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

  handleLine(line.split(' '));

  getPathToCurrentDirectory();
});
