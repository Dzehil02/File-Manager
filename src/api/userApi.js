const getUsername = () => {
    let name = 'Username';

    if (process.argv.length > 2) {
        const args = process.argv.slice(2);
        name = args.find((arg) => arg.startsWith('--username')).slice(11);
    }
    return name;
};

const username = getUsername();
export const welcomeMessage = `Welcome to the File Manager, ${username}!`;
export const goodbyeMessage = `Thank you for using File Manager, ${username}, goodbye!`;
