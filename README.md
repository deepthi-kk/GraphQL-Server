# GraphQL-Server

This code sets up an Apollo GraphQL server that provides a set of queries and mutations for interacting with a simple database. Here's a breakdown of what the code does:

### 1. **Apollo Server Setup**
   - **ApolloServer:** This is the main server class from Apollo, which is used to create a GraphQL server.
   - **startStandaloneServer:** This function starts the server as a standalone HTTP server on the specified port (`4000` in this case).
   - The server uses **type definitions (typeDefs)** and **resolvers** to define how to handle incoming GraphQL queries and mutations.

### 2. **Type Definitions (typeDefs)**
   - This defines the types of data available for querying in the GraphQL API. It’s imported from an external file (`./schema.js`), which presumably contains the schema for the GraphQL API, including `Game`, `Author`, `Review`, and the respective queries and mutations.

### 3. **Resolvers**
   - **Query Resolvers:** These resolvers define how to fetch data for different types of queries:
     - `games()`: Fetches all the games from the database.
     - `game(_, args)`: Fetches a specific game by its `id`.
     - `authors()`: Fetches all authors.
     - `author(_, args)`: Fetches a specific author by their `id`.
     - `reviews()`: Fetches all reviews.
     - `review(_, args)`: Fetches a specific review by its `id`.

   - **Game Resolver:** Defines how to fetch associated reviews for a particular game (one-to-many relationship).
   - **Author Resolver:** Fetches all reviews written by a specific author (one-to-many relationship).
   - **Review Resolver:** Fetches the author and the game related to a particular review (many-to-one relationships).

### 4. **Mutations**
   - **deleteGame(_, args):** Deletes a game from the `db.games` list based on the given `id` and returns the updated list of games.
   - **addGame(_, args):** Adds a new game to the `db.games` list. The game is assigned a random `id` and pushed to the list.
   - **updateGame(_, args):** Updates an existing game’s properties based on the provided `id` and `edits`.

### 5. **Database (db)**
   - The database is imported from `./_db.js`. It's an in-memory database object containing lists of `games`, `authors`, and `reviews`. The resolvers use this data to respond to the queries and mutations.

### 6. **Server Launch**
   - The server is started and listens on port `4000`. The `startStandaloneServer` function provides the GraphQL endpoint where the server will be ready to accept incoming requests.

### Purpose:
This code is creating a simple GraphQL API that:
- Provides querying capabilities to fetch data related to games, authors, and reviews.
- Allows clients to mutate (add, update, delete) game records.
- Defines relationships between games, authors, and reviews.

In summary, this code sets up a basic GraphQL server that serves a small relational database and allows clients to query and modify data related to games, authors, and reviews.
