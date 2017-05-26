const fetch = require("isomorphic-fetch")
const urlTools = require("url")
const traverse = require("traverse")
const jsdom = require("jsdom")
const _ = require("lodash")

/* 
  Deep search an object for a certain key
   -> returns array of objects containing key
*/
function findKey(obj, key) {
  if (_.has(obj, key)) return [obj]
  return _.flatten(
    _.map(obj, function(v) {
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

const parseColumn = column => Array.from(column).map(tr => tr.textContent)

const parseHTMLTable = html =>
  new Promise(resolve => {
    jsdom.env(html, [], (err, window) => {
      const { document } = window

      const labels = parseColumn(
        document.querySelectorAll("tr > td:nth-of-type(1)")
      )

      const values = parseColumn(
        document.querySelectorAll("tr > td:nth-of-type(2)")
      )

      resolve(_.zipObject(labels, values))
    })
  })

const getNutritionFacts = async url => {
  const json = await getJSON(url)
  // console.log(json)
  let compositionString = ""

  traverse(json._embedded.lanes).forEach(function() {
    if (typeof this.node === "string" && this.node.includes("Eiwitten")) {
      compositionString = this.node
    }
  })

  const html = compositionString.replace(/\[/g, "<").replace(/\]/g, ">")
  const nutritionTable = await parseHTMLTable(html)

  return nutritionTable
}

module.exports = {
  getNutritionFacts,
  getPriceInfo,
  getProductInfo
}
