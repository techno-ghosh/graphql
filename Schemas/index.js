const graphql  = require('graphql')
const { GraphQLObjectType, GraphQLFloat, GraphQLString, GraphQLList, GraphQLSchema } = graphql;
const stockType = require('./TypeDefinition/stockType')
var stockData = require('../data/data.json')


Array.prototype.max = function() {
    return Math.max.apply(null, this);
  };
  
Array.prototype.min = function() {
return Math.min.apply(null, this);
};

setInterval(() => {

    stockData.forEach((element,index) => {
        element.historical_prices.push(genRand(element.price_2007,1000,2))  
    })
},1000)

const RootQuery = new GraphQLObjectType({
    name : "RootqueryType",
    fields : {
        getAllStocks : {
          type : new GraphQLList(stockType),
          resolve(parent, args) {
            
            return stockData.map(item => {
                console.log(item.historical_prices);
                return {
                    ...item,
                    highest_price : item.historical_prices.max(),
                    lowest_price : item.historical_prices.min()
                }
            })
          }
        },
        getSpecificStock : {
            type : stockType,
            args : {
                symbol : { type : GraphQLString }
            },
            resolve(parent, args) {
                stockData.filter(item => {
                    console.log(item.symbol);
                })
                return stockData.filter(item => item.symbol == args.symbol) ? stockData.filter(item => item.symbol == args.symbol)[0] : []
            }
        }
    }
})
const Mutation = new GraphQLObjectType({
  name : "StockCreation",
  fields : {
    createStock : {
      type : stockType,
      args : {
        company : { type : GraphQLString },
        description : { type : GraphQLString },
        initial_price : { type : GraphQLFloat },
        price_2002 : { type : GraphQLFloat },
        price_2007 : { type : GraphQLFloat },
        symbol : { type : GraphQLString },
        historical_prices : { type : new GraphQLList(GraphQLFloat) }
      },
      resolve(parent, args) {
        stockData.push({
          company : args.company,
          description : args.description,
          initial_price : args.initial_price,
          price_2002 : args.price_2002,
          price_2007 : args.price_2007,
          symbol : args.symbol,
          historical_prices : args.historical_prices
        })

        return args;
      }
    }
  }
})


function genRand(min, max, decimalPlaces) {  
    var rand = Math.random()*(max-min) + min;
    var power = Math.pow(10, decimalPlaces);
    return Math.floor(rand*power) / power;
}

    
  
  


module.exports = new GraphQLSchema({ query : RootQuery, mutation : Mutation })
