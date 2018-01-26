import fs from 'fs';
import path from 'path';

import { getMockLogger } from '../mockLogger';

const log = getMockLogger();

/**
 * Reads the file at the path given.
 * @param filePath
 * @returns {*}
 */
export function readFile(filePath) {
  const completePath = path.join(__dirname, '/', filePath);
  log.verbose(`Reading file: '${completePath}'`);
  try {
    return fs.readFileSync(completePath, 'utf-8');
  } catch (e) {
    log.debug(e.message);
    throw new Error(`Failed to read file '${completePath}'!`);
  }
}


/**
 * Write to the given filePath with the contents of a file.  The given errMsg should be a constant.
 *
 * @param filePath
 * @param fileContents
 * @returns {*}
 */
export function writeFile(filePath, fileContents) {
  const completePath = path.join(__dirname, '/', filePath);
  log.verbose(`Writing file: '${completePath}'`);
  try {
    return fs.writeFileSync(completePath, fileContents);
  } catch (e) {
    log.debug(e.message);
    throw new Error(`Failed to write '${completePath}'!`);
  }
}
