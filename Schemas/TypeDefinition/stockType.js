
const graphql  = require('graphql')
const { GraphQLObjectType, GraphQLFloat, GraphQLString, GraphQLList, GraphQLInputObjectType } = graphql;

const stockType = new GraphQLObjectType({
    name : "Stock",
    fields : () => ({
      company : { type : GraphQLString },
      description : { type : GraphQLString },
      initial_price : { type : GraphQLFloat },
      price_2002 : { type : GraphQLFloat },
      price_2007 : { type : GraphQLFloat },
      symbol : { type : GraphQLString },
      historical_prices : { type : new GraphQLList(GraphQLFloat) },
      highest_price : { type : GraphQLFloat },
      lowest_price : { type : GraphQLFloat }
    })
})


module.exports = stockType;