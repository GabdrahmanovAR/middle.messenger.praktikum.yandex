// type PlainObject<T = any> = {
//   [k in string]: T;
// };

// function isPlainObject(value: unknown): value is PlainObject {
//   return typeof value === 'object'
//       && value !== null
//       && value.constructor === Object
//       && Object.prototype.toString.call(value) === '[object Object]';
// }

// function isArray(value: unknown): value is [] {
//   return Array.isArray(value);
// }

// function isArrayOrObject(value: unknown): value is [] | PlainObject {
//   return isPlainObject(value) || isArray(value);
// }

// function isObjectsEqual(lhs: PlainObject, rhs: PlainObject): boolean {
//   if (Object.keys(lhs).length !== Object.keys(rhs).length) {
//     return false;
//   }

//   for (const [key, value] of Object.entries(lhs)) {
//     const rightValue = rhs[key];
//     if (isArrayOrObject(value) && isArrayOrObject(rightValue)) {
//       if (isEqual(value, rightValue)) {
//         continue;
//       }
//       return false;
//     }

//     if (value !== rightValue) {
//       return false;
//     }
//   }

//   return true;
// }

// function isEqual(lhs: unknown, rhs: unknown): boolean {
//   if (typeof lhs === 'string' && typeof rhs === 'string') {
//     return lhs === rhs;
//   }

//   if (isPlainObject(lhs) && isPlainObject(rhs)) {
//     return isObjectsEqual(lhs as PlainObject, rhs as PlainObject);
//   }

//   return true;
// }

// export default isEqual;

type PlainObject<T = any> = {
  [k in string]: T;
};

function isPlainObject(value: unknown): value is PlainObject {
  return typeof value === 'object'
      && value !== null
      && value.constructor === Object
      && Object.prototype.toString.call(value) === '[object Object]';
}

function isArray(value: unknown): value is [] {
  return Array.isArray(value);
}

function isArrayOrObject(value: unknown): value is [] | PlainObject {
  return isPlainObject(value) || isArray(value);
}

function isEqual(lhs: PlainObject, rhs: PlainObject): boolean {
  if (Object.keys(lhs).length !== Object.keys(rhs).length) {
    return false;
  }

  for (const [key, value] of Object.entries(lhs)) {
    const rightValue = rhs[key];
    if (isArrayOrObject(value) && isArrayOrObject(rightValue)) {
      if (isEqual(value, rightValue)) {
        continue;
      }
      return false;
    }

    if (value !== rightValue) {
      return false;
    }
  }

  return true;
}

export default isEqual;