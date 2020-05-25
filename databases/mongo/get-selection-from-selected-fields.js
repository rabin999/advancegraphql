const graphqlFields = require("graphql-fields");

/**
 * return query object for selected fields for mongoose
 * 
 * @param  {} info
 * @param  {} fieldPath=null
 */
function getMongooseSelectionFromSelectedFields(info, fieldPath = null) {
    const selections = graphqlFields(info);
    
    const mongooseSelection = Object
        .keys(fieldPath ? selections[fieldPath] : selections)
        .reduce((a, b) => ({ ...a, [b]: 1 }), {})
    
    return mongooseSelection;
}

module.exports = getMongooseSelectionFromSelectedFields