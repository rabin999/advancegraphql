const config = {
    production: {},
    local: {
        db: {
            connectionURL: 'mongodb+srv://fuseapollo:linuxislife@12345@fuseprototype-ts4my.mongodb.net/research?retryWrites=true&w=majority'
        }
    }
}

module.exports = config[process.env.NODE_ENV || "local"]