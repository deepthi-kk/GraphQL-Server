import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { typeDefs } from "./schema.js";
import db from "./_db.js";
    //resolvers are to handle the queries based on our schema - How do we respond to the queries to our graph
const resolvers = {
    Query: {
        games(){
            return db.games
        },
        authors(){
            return db.authors
        },

        reviews(){
            return db.reviews
        }
    }
}

// server setup

const server = new ApolloServer({

    //typeDefs -- definition sof types of data, that we wanna make available on the graph

    typeDefs,
    resolvers


})


const { url } = await startStandaloneServer(server, {

    listen: { port: 4000}


})

console.log('Server ready at port', 4000)
