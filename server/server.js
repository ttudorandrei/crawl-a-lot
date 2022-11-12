const express = require("express");
const { createServer } = require("http");
const { makeExecutableSchema } = require("@graphql-tools/schema");
const { ApolloServer } = require("apollo-server-express");
const mongoose = require("mongoose");

const { DB_URL, MONGOOSE_OPTIONS } = require("./config/config");
mongoose.connect(DB_URL, MONGOOSE_OPTIONS);
const db = mongoose.connection;

(async function () {
  const app = express();

  const httpServer = createServer(app);

  const schema = makeExecutableSchema({
    typeDefs: `

  type Test {
    initial: String
  }
  type Query {
    baseQuery: [Test]
  }
`,
  });

  const server = new ApolloServer({ schema });

  await server.start();

  server.applyMiddleware({ app });

  const PORT = process.env.PORT || 4444;

  db.once("open", () => {
    httpServer.listen(PORT, () => {
      console.log(`🚀  Server ready at  http://localhost:${PORT}/graphql`);
    });
  });
})();
