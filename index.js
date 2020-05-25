const express   = require('express');
const cors      = require('cors');
const database  = require('./database')
const APIServer = require('./apollo-server')

// Initialize Database Connection
database.connection()

const app = express();
app.use(cors());

// Applying Apollo Server
APIServer.applyMiddleware({ app });

app.get('/', function(_, res) {
    res.header("Content-type", "text/html")
    res.end(`<h3>Welcome to GraphQL API with Apollo</h3> <a href="/graphql">Explore GraphQL API</a>`)
});

app.listen({ port: 4000 }, () => {
    console.log(`🚀 Server ready at http://localhost:4000${APIServer.graphqlPath}`)
})