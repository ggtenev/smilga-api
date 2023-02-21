const Product = require("../models/product")


const getAllProductsStatic = async (req, res) => {
 
  const products = await Product.find({price:{$gte:30}})
    .sort(' price')
    .select('name price')
  
  
  res.status(200).json({
    numberHits:products.length,
    products,
  })
}
const getAllProducts = async (req, res) => {
  
  
  const { featured, company, name, sort, fields, numericFilters } = req.query
  const queryObject = {}
  
  if (featured) {
    queryObject.featured =  featured === 'true' ? true : false
  }
  if (company) {
    queryObject.company = company
  }
  if (name) {
    queryObject.name = {$regex:name,$options:'i'}
  }

   //numeric filters
  if (numericFilters) {
    console.log(numericFilters);
    const operatorMap = {
      '>':'$gt',
      '>=':'$gte',
      '=':'$eq',
      '<':'$lt',
      '<=':'$lte',
    }
    const regex = /\b(<|>|=|<=|>=)\b/ig
    let filters = numericFilters.replace(regex, (match) => `-${operatorMap[match]}-`)

    const options = ['price', 'rating']
    filters = filters.split(',').forEach(item => {
      const [field, operator, value] = item.split('-')
      if (options.includes(field)) {
        queryObject[field] = {[operator]:Number(value)}
      }
    })

    console.log(queryObject);
    console.log(filters);
  }

  //creating the query 
  let result = Product.find(queryObject)
 
  
  //sorting
  if (sort) {
    const sortList = sort.split(',').join(' ')
    result = result.sort(sortList)
  } else {
    result = result.sort('createdAt')
  }
  //selecting fields
  if (fields) {
     const fieldsList = fields.split(',').join(' ')
     result = result.select(fieldsList)
  }

  //pagination
  const page = Number(req.query.page) || 1
  const limit = Number(req.query.limit) || +Infinity
  const skip = (page - 1) * limit
  result = result.skip(skip).limit(limit)


  let products = await result

  res.status(200).json({
    numberHits:products.length,
    products,
  })
}

module.exports = {getAllProducts,getAllProductsStatic}