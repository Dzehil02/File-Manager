import { INVALID_INPUT, OPERATION_FAILED } from '../const/const.js';
import {goToTheDir} from '../dirNav/cd.js';
import {showList} from '../dirNav/ls.js';
import {upDir} from '../dirNav/up.js';
import {copy} from '../fileOps/copy.js';
import {create} from '../fileOps/create.js';
import {deleteFile} from '../fileOps/delete.js';
import {move} from '../fileOps/move.js';
import {read} from '../fileOps/read.js';
import {rename} from '../fileOps/rename.js';
import {calculateHash} from '../hash/calcHash.js';
import {getOsInfo} from '../os/os.js';
import {compress} from '../zip/compress.js';
import {decompress} from '../zip/decompress.js';

export const getPathToCurrentDirectory = () =>
  console.log(`You are currently in ${process.cwd()}`);

export const handleLine = async (line) => {
  try {
  const [cmd, arg1, arg2] = line;

  switch (cmd) {
    case 'ls':
      showList();
      break;

    case 'up':
      upDir();
      break;

    case 'cd':
      goToTheDir(arg1);
      break;

    case 'add':
      create(arg1);
      break;

    case 'rm':
      deleteFile(arg1);
      break;

    case 'rn':
      rename(arg1, arg2);
      break;

    case 'cp':
      copy(arg1, arg2);
      break;

    case 'mv':
      move(arg1, arg2);
      break;

    case 'cat':
      read(arg1);
      break;

    case 'hash':
      calculateHash(arg1);
      break;

    case 'compress':
      compress(arg1, arg2);
      break;

    case 'decompress':
      decompress(arg1, arg2);
      break;

    case 'os':
      getOsInfo(arg1);
      break;
  
    default:
      console.log(INVALID_INPUT);
      break;
  }
  } catch (error) {
    console.log(OPERATION_FAILED);
  }
  
}