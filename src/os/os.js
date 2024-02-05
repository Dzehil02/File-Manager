import os from 'os';
import { INVALID_INPUT, OPERATION_FAILED } from '../const/const.js';

export const getOsInfo = async (flag) => {
    try {
        const getCpus = () =>
            os.cpus().map((proc) => {
                return {
                    model: proc.model,
                    speed: `${(proc.speed / 1000).toFixed(2)} Ghz`,
                };
            });
        const getEOL = () => os.EOL;
        const getHomeDir = () => os.homedir();
        const getUserName = () => os.userInfo();
        const getArch = () => os.arch();

        const flags = {
            '--EOL': getEOL(),
            '--cpus': getCpus(),
            '--homedir': getHomeDir(),
            '--username': getUserName()['username'],
            '--architecture': getArch(),
        };

        console.log(flags[flag] || INVALID_INPUT);
    } catch (error) {
        console.log(OPERATION_FAILED);
    }
};
