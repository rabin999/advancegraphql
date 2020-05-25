// available databases
const databases = {
    mongo: {
        connection: require("./databases/mongo/connection"),
        query: require("./databases/mongo/query"),
    },
    mysql: {
        connection: require("./databases/mysql/connection"),
        query: require("./databases/mysql/query"),
    }
}

class DatabaseNotFoundError extends Error {
    constructor(message) {
        super(message)
        this.message = "Database not found."
        
        // saving class name in the property of our custom error as a shortcut
        this.name = this.constructor.name
    }
}

module.exports = function connection(database) {
    console.log(`Getting Database -> [${__filename}]`)
    if (database in databases) {
        return databases[database];
    }

    throw new DatabaseNotFoundError()
}