const isNumber = require("validator").default.isNumeric;
const isMongoId = require("validator").default.isMongoId;

const ProductModel = require("../model/product");
const successResponse = require("../responses/success");
const errorResponse = require("../responses/error");

/**
 * 
 * @param {*} req : Request Object
 * @param {*} res : Response Object
 * 
 * GET request to get all the products from database
 */
exports.readProducts = async function (req, res) {

  try {
    const products = await ProductModel.find({ isDeleted: false }).select("-isDeleted -createdAt -updatedAt").lean();

    if (products) { res.json(successResponse(products, "Product fetched successfully")) }
    else { res.json(successResponse(null, "No products found")) }
  } catch (error) {
    res.status(500).json(errorResponse("UNKNOWN_ERROR", "There is some error please try after sometime."));
  }
}

/**
 * 
 * @param {*} req : Request Object
 * @param {*} res : Response Object
 * 
 * POST request to handle adding product to database
 */
exports.addProduct = async function (req, res) {
  const { productName, category, price, available, vat, discount } = req.body;

  //Validations
  if (!productName) { return res.json(errorResponse("EMPTY_FIELD", "Name is required to add product")) }
  if (!category) { return res.json(errorResponse("EMPTY_FIELD", "Category is required to add product")) }
  if (!price) { return res.json(errorResponse("EMPTY_FIELD", "Price is required to add product")) }
  if (!isNumber(price) || parseInt(price) < 0) { return res.json(errorResponse("INVALID_INPUT", "Price is not a number")) }
  if (!available) { return res.json(errorResponse("EMPTY_FIELD", "Available Units is required to add product")) }
  if (!isNumber(available) || parseInt(available) < 0) { return res.json(errorResponse("INVALID_INPUT", "available is not a number")) }
  if (!vat) { return res.json(errorResponse("EMPTY_FIELD", "VAT is required to add product")) }
  if (!isNumber(vat) || parseInt(vat) < 0 || parseInt(vat) > 100) { return res.json(errorResponse("INVALID_INPUT", "VAT is an invalid value")) }
  if (discount && parseInt(discount) < 0 || parseInt(discount) > 100) { return res.json(errorResponse("INVALID_INPUT", "Discount is an invalid value")) }

  try {
    const product = { productName, category, price, available, vat };
    if (discount) { product.discount = discount }

    const response = await ProductModel.create(product);

    if (response) { res.json(successResponse(response, "Product added successfully")) }
    else { res.json(errorResponse("UNKNOWN_ERROR", "There is an error adding product please try after sometime.")) }
  } catch (error) {
    res.status(500).json(errorResponse("UNKNOWN_ERROR", "There is some error please try after sometime."));
  }
}

/**
 * 
 * @param {*} req : Request Object
 * @param {*} res : Response Object
 * 
 * PUT request to handle updateing a product in database
 */
exports.updateProduct = async function (req, res) {
  const { _id, productName, category, price, available, vat, discount } = req.body;

  //Validations
  if (_id && !isMongoId(_id)) { return res.json(errorResponse("INVALID_INPUT", "Product id is not a valid product id")) }
  if (price && !isNumber(price) || parseInt(price) < 0) { return res.json(errorResponse("INVALID_INPUT", "Price is not a number")) }
  if (available && !isNumber(available) || parseInt(available) < 0) { return res.json(errorResponse("INVALID_INPUT", "available is not a number")) }
  if (vat && !isNumber(vat) || parseInt(vat) < 0 || parseInt(vat) > 100) { return res.json(errorResponse("INVALID_INPUT", "VAT is an invalid value")) }
  if (discount && parseInt(discount) < 0 || parseInt(discount) > 100) { return res.json(errorResponse("INVALID_INPUT", "Discount is an invalid value")) }

  try {
    const product = { productName, category, price, available, vat, discount };

    const response = await ProductModel.updateOne({ _id }, product);

    if (response.n > 0) { res.json(successResponse({ _id }, "Product updated successfully")) }
    else if (response.n == 0) { res.json(errorResponse("NOT_FOUND", "Product not found")) }
  } catch (error) {
    res.status(500).json(errorResponse("UNKNOWN_ERROR", "There is some error please try after sometime."));
  }
}

/**
 * 
 * @param {*} req : Request Object
 * @param {*} res : Response Object
 * 
 * DELETE request to handle deleting a product from database
 */
exports.deleteProduct = async function (req, res) {
  const { _id } = req.body;

  //Validations
  if (_id && !isMongoId(_id)) { return res.json(errorResponse("INVALID_INPUT", "Product id is not a valid product id")) }

  try {
    const response = await ProductModel.updateOne({ _id }, { isDeleted: true });

    if (response.n > 0) { res.json(successResponse({ _id }, "Product deleted successfully")) }
    else if (response.n == 0) { res.json(errorResponse("NOT_FOUND", "Product not found")) }
  } catch (error) {
    res.status(500).json(errorResponse("UNKNOWN_ERROR", "There is some error please try after sometime."));
  }
}