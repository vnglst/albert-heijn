const fetch = require("isomorphic-unfetch")
const urlTools = require("url")
const { map, has, flatten } = require("lodash")

/* 
  Deep search an object for a certain key
   -> returns array of objects containing key
*/
function findKey(obj, key) {
  if (has(obj, key)) return [obj]
  return flatten(
    map(obj, function(v) {
      return typeof v == "object" ? findKey(v, key) : []
    }),
    true
  )
}

const getJSONUrl = url => {
  const { pathname } = urlTools.parse(url)
  return `https://www.ah.nl/service/rest/delegate?url=${encodeURIComponent(pathname)}`
}

const getJSON = async url => {
  const response = await fetch(getJSONUrl(url))
  if (response.status >= 400) {
    throw new Error("Bad response from server")
  }
  return response.json()
}

const getProductInfo = async (url, productId) => {
  const json = await getJSON(url)
  const allProducts = findKey(json, "id")
  const productInfo = allProducts.find(product => product.id === productId)
  return productInfo
}

const getPriceInfo = async (url, productId) => {
  const productInfo = await getProductInfo(url, productId)
  return {
    price: productInfo.priceLabel.now,
    unit: productInfo.unitSize,
    availability: productInfo.availability
  }
}

module.exports = {
  getPriceInfo,
  getProductInfo
}
