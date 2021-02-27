const isNumber = require("validator").default.isNumeric;
const isMongoId = require("validator").default.isMongoId;

const SaleModel = require("../model/sale");
const successResponse = require("../responses/success");
const errorResponse = require("../responses/error");

exports.createSale = async function (req, res) {
  const { employeeId, dateOfSale, products, totalDiscount, vat, total } = req.body;

  //Validations
  if (!employeeId) { return res.json(errorResponse("INVALID_INPUT", "Employee id is required to complete the sale")) }
  if (employeeId && !isMongoId(employeeId)) { return res.json(errorResponse("INVALID_INPUT", "Employee id is not a valid employee id")) }
  if (!dateOfSale) { return res.json(errorResponse("INVALID_INPUT", "Date of sale is required to complete the sale")) }
  if (!products) { return res.json(errorResponse("INVALID_INPUT", "Products list is required to complete the sale")) }
  if (!Array.isArray(products) || products.length == 0) { return res.json(errorResponse("INVALID_INPUT", "Product List is invalid")) }
  if (!totalDiscount) { return res.json(errorResponse("INVALID_INPUT", "Employee id is required to complete the sale")) }
  if (!isNumber(totalDiscount) || totalDiscount < 0) { return res.json(errorResponse("INVALID_INPUT", "Total Discount is an invalid value")) }
  if (!vat) { return res.json(errorResponse("INVALID_INPUT", "VAT is required to complete the sale")) }
  if (!isNumber(vat) || vat < 0) { return res.json(errorResponse("INVALID_INPUT", "VAT is an invalid value")) }
  if (!total) { return res.json(errorResponse("INVALID_INPUT", "Total value is required to complete the sale")) }
  if (!isNumber(total) || total < 0) { return res.json(errorResponse("INVALID_INPUT", "Total is an invalid value")) }

  try {
    const sale = { employeeId, dateOfSale, products, totalDiscount, vat, total };

    const response = await SaleModel.create(sale);

    if (response) { res.json(successResponse(response, "Product added successfully")) }
    else { res.json(errorResponse("UNKNOWN_ERROR", "There is a creating sale please try after sometime.")) }
  } catch (error) {
    res.status(500).json(errorResponse("UNKNOWN_ERROR", "There is some error please try after sometime."));
  }
}