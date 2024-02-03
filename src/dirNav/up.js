import path from 'path';

export const upDir = () => {
    try {
        const currentPath = process.cwd();
        const pathParts = currentPath.split(path.sep);
        if (pathParts.length > 1) {
          pathParts.pop();
          const newPath = path.join("..");
          process.chdir(newPath);
        }
      } catch (error) {
        console.error("Error changing directory:", error.message);
      }
}