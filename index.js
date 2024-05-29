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
        game(_, args){
            return db.games.find((game) => game.id === args.id)

        },
        authors(){
            return db.authors
        },
        author(_, args){
            return db.authors.find((author) => author.id === args.id)

        },

        reviews(){
            return db.reviews
        },
        review(_, args){
            return db.reviews.find((review) => review.id === args.id)

        }
        
    },

    Game: {
        reviews(parent){
            return db.reviews.filter((r) => r.game_id === parent.id)
        }
    },

    Author: {
        reviews(parent){
            return db.reviews.filter((r) => r.game_id === parent.id)
        }
    },
    Review: {
        author(parent){
            return db.authors.find((a) => a.id === parent.author_id)
        },
        game(parent){
            return db.games.find((g) => g.id === parent.game_id)
        }
    },
    Mutation: {
       
        deleteGame(_, args) {
            db.games = db.games.filter((g) => g.id != args.id)
            return db.games
        },

        addGame(_, args) {
            let game = {
                ...args.game,
                id: Math.floor(Math.random() * 10000). toString()
            }
            db.games.push(game)
            return game
        },
        updateGame(_, args){
            db.games = db.games.map((g) => {
                if (g.id === args.id){
                    return {...g, ...args.edits}
                }
                return g
            })
            return db.games.find((g) => g.id === args.id)
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
