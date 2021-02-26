/**
 * 
 * @param {*} data : Any Data
 * @param {*} message : Success message
 */
module.exports = function (data, message) {
  return { status: "SUCCESS", data, message };
}