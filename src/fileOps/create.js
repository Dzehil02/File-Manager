import fs from "fs";
import path from "path";

export const create = async (fileName) => {
  const currentPath = path.join(process.cwd(), fileName);
  console.log(currentPath);
  try {
    fs.writeFile(currentPath, '', (err) => {
      if (err) {
        return console.log(err);
      }
    });
  } catch (error) {
    console.log(error);
  }
};
