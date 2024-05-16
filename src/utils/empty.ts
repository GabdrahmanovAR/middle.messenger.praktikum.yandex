import { EMPTY_STRING } from '../../assets/constants/common';

export const empty = (variable: unknown): boolean => {
  if (variable === null || variable === undefined) return true;

  if (typeof variable === 'string') {
    return variable === EMPTY_STRING;
  }

  if (typeof variable === 'boolean' || typeof variable === 'number') {
    return false;
  }

  if (Array.isArray(variable)) {
    return variable.length === 0;
  }

  if (typeof variable === 'object') {
    return Object.keys(variable).length === 0;
  }

  if (typeof variable === 'function') {
    return false;
  }

  return false;
};
