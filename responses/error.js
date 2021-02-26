/**
 * 
 * @param {*} errorName : Error Name
 * @param {*} errorMessage : Error Message
 * @param {*} data : Any Data
 */
module.exports = function (errorName, errorMessage, data) {
  return { status: "FAILED", data, errorName, errorMessage };
}