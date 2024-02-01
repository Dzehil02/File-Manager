export const getUsername = () => {
    let name = "Username";
  
    if (process.argv.length > 2) {
      const args = process.argv.slice(2);
      name = args.find((arg) => arg.startsWith("--username")).slice(11);
    }
    return name;
  };
