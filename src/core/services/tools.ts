/* eslint-disable */
//@ts-nocheck
import qs from "qs";

export const tools = {
  makeCapitalCase: (s) => {
    if (typeof s !== "string") return "";
    return s.charAt(0).toUpperCase() + s.toLowerCase().slice(1);
  },
  toLowerCase: (s) => {
    if (typeof s !== "string") return "";
    return s.toLowerCase();
  },
  parseBool: (str) => {
    let val = false;
    if (typeof str === "string") {
      if (str.trim().toLowerCase() === "true") {
        val = true;
      } else if (str.trim().toLowerCase() === "false") {
        val = false;
      }
      return val;
    } else {
      return str;
    }
  },
  justNumber: (str) => {
    let result = str.replace(/[^\d]/g, "");
    return result;
  },

  justEnglish: (value) => {
    return `${value}`.replace(/[^a-zA-Z\s]/g, "");
  },

  isObject: (data) => {
    return data && typeof data === "object";
  },

  toObject(data) {
    return this.isObject(data) ? data : {};
  },

  isArray: (data) => {
    return data && typeof data === "object" && data.constructor === Array;
  },
  toArray(data = []) {
    return this.isArray(data) ? data : [];
  },
  arrayPad: (arr, len, fill) => {
    return arr.concat(Array(len).fill(fill)).slice(0, len);
  },
  toStringOrHyphen: (value) => {
    return value ? `${value}`.trim() : tools.emptyState();
  },
  jsonDecode: (json) => {
    try {
      return JSON.parse(json);
    } catch (e) {
      return null;
    }
  },
  /**
   * Find specific field error message from errorArray
   * @param {{field: String, errorMessage: String}[]} errorArray
   * @param {string} fieldName the field's name that you want to look for into errorArray
   * @return {string} field error message if found. otherwise return empty string
   */
  findErrorMessage: (errorArray, fieldName) => {
    const t = errorArray.find((x) => x.field === fieldName);
    if (t) {
      return t.errorMessage;
    } else {
      return "";
    }
  },
  /**
   * Get Validation model, and input data object then return result array that we can store it into errors Array. if there is no error, it will be empty
   * @param {Schema} validationModelSchema
   * @param {Object} inputObject object of values that contain field's name for each input
   * @return {{field: String, errorMessage: String}[]}
   */
  applyModelCheckValidation: (validationModelSchema, inputObject) => {
    let result = [];
    const checkResult = validationModelSchema.check(inputObject);
    for (let key in checkResult) {
      let value = checkResult[key];
      if (value.hasError) {
        result.push({ field: key, errorMessage: value.errorMessage });
      }
    }
    return result;
  },
  /**
   * Convert any Object into QueryString format
   * @param {any} inputObject give the object to serialize it into QueryString
   * @returns {string}
   * @example
   *  history.push({
   *    pathname:ConfigLink.account,
   *    search:useQueryString({id:1,name:"ali"})
   * })
   */
  useQueryString: (inputObject = {}) => {
    let temp = qs.stringify({ ...inputObject });
    return temp;
  },
  emptyState: () => "---",
  // converts number to string representation with K and M.
  // toFixed(d) returns a string that has exactly 'd' digits
  // after the decimal place, rounding if necessary.
  numFormatterToTruncate: (num) => {
    if (num > 999 && num < 1000000) {
      return (num / 1000) % 1 === 0
        ? num / 1000 + "K"
        : (num / 1000).toFixed(1) + "K"; // convert to K for number from > 1000 < 1 million
    } else if (num > 1000000) {
      return (num / 1000000) % 1 === 0
        ? num / 1000000 + "M"
        : (num / 1000000).toFixed(1) + "M"; // convert to M for number from > 1 million
    } else if (num < 900) {
      return num; // if value < 1000, nothing to do
    }
  },
};
