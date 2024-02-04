import fs from "fs";
import path from "path";
import { OPERATION_FAILED } from "../const/const.js";

export const create = async (fileName) => {
  const currentPath = path.join(process.cwd(), fileName);
  try {
    fs.writeFile(currentPath, '', (err) => {
      if (err) {
        console.log(OPERATION_FAILED);
      }
    });
  } catch (error) {
    console.log(error.message);
  }
};
