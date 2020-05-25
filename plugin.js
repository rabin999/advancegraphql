const graphqlPlugin = {
    requestDidStart (requestContext) {
        console.log(`Request Started! Query: \n`);
        
        return {
            // fires whenever apollo server will parse a GraphQl
            // request to create its associated document AST
            parsingDidStart(requestContext) {
                console.log(`Parsing started !`)
            },

            // Fires whenever Apollo Server will validate a
            // request't document AST against your GraphQL schema.
            validationDidStart(requestContext) {
                console.log('Validation Started!')
            }
        }
    }
}

module.exports = graphqlPlugin