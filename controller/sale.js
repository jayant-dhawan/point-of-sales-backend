const isNumber = require("validator").default.isNumeric;
const isMongoId = require("validator").default.isMongoId;

const SaleModel = require("../model/sale");
const ProductModel = require("../model/product");
const successResponse = require("../responses/success");
const errorResponse = require("../responses/error");



/**
 * 
 * @param {*} req : Request Object
 * @param {*} res : Response Object
 * 
 * POST request to create a sale and save to database
 */
exports.createSale = async function (req, res) {
  const { employeeId, dateOfSale, products, totalDiscount, vat, total } = req.body;

  //Validations
  if (!employeeId) { return res.json(errorResponse("INVALID_INPUT", "Employee id is required to complete the sale")) }
  if (employeeId && !isMongoId(employeeId)) { return res.json(errorResponse("INVALID_INPUT", "Employee id is not a valid employee id")) }
  if (!dateOfSale) { return res.json(errorResponse("INVALID_INPUT", "Date of sale is required to complete the sale")) }
  if (!products) { return res.json(errorResponse("INVALID_INPUT", "Products list is required to complete the sale")) }
  if (!Array.isArray(products) || products.length == 0) { return res.json(errorResponse("INVALID_INPUT", "Product List is invalid")) }
  if (!isNumber(totalDiscount.toString()) || totalDiscount < 0) { return res.json(errorResponse("INVALID_INPUT", "Total Discount is an invalid value")) }
  if (!isNumber(vat.toString()) || vat < 0) { return res.json(errorResponse("INVALID_INPUT", "VAT is an invalid value")) }
  if (!isNumber(total.toString()) || total < 0) { return res.json(errorResponse("INVALID_INPUT", "Total is an invalid value")) }

  try {
    const sale = { employeeId, dateOfSale, products, totalDiscount, vat, total };

    //Bulk operations array which will contain all the operations to update
    //available units in products after a sale
    let bulkOps = []

    //creating bulk operations
    for (let i = 0; i < products.length; i++) {
      if (products[i].count > products[i].available) {
        return res.json(errorResponse("INVALID_SALE", `Not enough quantity available for ${products[i].productName}`));
      }
      let operation = {
        updateOne: {
          "filter": { "_id": products[i]._id },
          "update": { "$inc": { "available": -products[i].count } }
        }
      };
      bulkOps.push(operation);
    }

    //Saving sale to database
    const response = await SaleModel.create(sale);

    if (response) {
      //Updating available units in products
      await ProductModel.bulkWrite(bulkOps)
      res.json(successResponse(response, "Product added successfully"))
    }
    else { res.json(errorResponse("UNKNOWN_ERROR", "There is a creating sale please try after sometime.")) }
  } catch (error) {
    console.log(error);
    res.status(500).json(errorResponse("UNKNOWN_ERROR", "There is some error please try after sometime."));
  }
}