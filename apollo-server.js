const { ApolloServer, gql, } = require('apollo-server-express');
const Book = require('./databases/mongo/models/book');
const Author = require('./databases/mongo/models/author');
const graphqlPlugin = require('./plugin')
const { UpperCaseDirective, RestDirective } = require("./directive");
const QueryResolver = require('./query-resolver');

let links = [{
    id: 'link-0',
    url: 'www.howtographql.com',
    description: 'Fullstack tutorial for GraphQL'
}];
let idCount = links.length

const typeDefs = gql`
    directive @upper on FIELD_DEFINITION
    directive @rest(url: String) on FIELD_DEFINITION

    interface RequiredSchemaFields {
        id: ID!
    }

    type Library {
        branch: String
        books: [Book!]
    }

    type Book implements RequiredSchemaFields {
        id: ID!
        name: String!
        genre: String! @upper
        author: Author
        isbn: String @deprecated
        detail: String @rest(url: "https://www.books.com/{id}/detail")
    }

    type Author implements RequiredSchemaFields {
        id: ID!
        name: String!
        age: Int!
        """
        Collection of books related to author
        """
        books: [Book]
    }

    input Paginate {
        start: Int
        limit: Int
    }

    input BookFilter {
        search: String
        paginate: Paginate
    }

    type Query {
        book: Book
        author: Author
        books(query: BookFilter): [Book]
        authors: [Author]
        libraries: [Library]
    }

    type Link {
        id: ID!
        description: String!
        url: String!
    }

    type Mutation {
        # This mutatino takes name and responds with a stored name
        post(url: String!, description: String!): Link!
    }
`

const resolvers = {
    Query: QueryResolver,
    Library: {
        books: (parent, args) => {
            return Book.find({}).limit(10).lean().exec()
        }
    },
    Author: {
        id: (parent) => {
            return parent._id;
        },
        books: (parent, args) => {
            return Book.find({ authorId: parent._id }).limit(2).lean().exec()
        }
    },
    Book: {
        id: (parent) => {
            return parent._id;
        },
        author: (parent, args) => {
            return Author.findById(parent.authorId).lean().exec()
        }
    },
    Mutation: {
        post: (parent, args) => {
            const link = {
                id: `link-${idCount++}`,
                description: args.description,
                url: args.url,
            }
            links.push(link)

            return link
        }
    }
}

const server = new ApolloServer({
    typeDefs,
    resolvers,
    plugins: [ graphqlPlugin ],
    context: () => {
        return { 
            user: {
                fullName: "John doe",
                username: "john",
                avatar: "https://avatar.com/john12/320*240",
                accessToken: "kflasdf990897*&&^%gub(Ugg78tg9SUHo90u0iokflasdf990897*&&^%gub(Ugg78tg9SUHo90u0i"
            } 
        }
    },
    schemaDirectives: {
        upper: UpperCaseDirective,
        rest: RestDirective
    }
});

module.exports = server