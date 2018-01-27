import { getActiveLogger } from '../dist/utils/winston';

// Doesn't do anything
function doNothing() {}

/**
 * Call this method if you want to use the real logger
 */
export function getRealLogger() {
  return getActiveLogger();
}

/**
 * Call this method for the mock logger
 */
export function getMockLogger() {
  return {
    warn: doNothing,
    info: doNothing,
    http: doNothing,
    debug: doNothing,
    verbose: doNothing,
    silly: doNothing,
    log: doNothing
  }
}
