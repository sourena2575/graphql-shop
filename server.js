const mongoose = require("mongoose");
const config = require("config");
const { ApolloServer } = require("apollo-server");
const typeDefs = require("./graphql/type/typeDefs");
const resolvers = require("./graphql/resolvers");
const PORT = process.env.PORT || 5000;

// initial server
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => ({ req }),
});
// connect to mdb
const uri = config.get("mdb");
mongoose
  .connect(uri, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    return server.listen({ port: PORT });
  })
  .then((res) => {
    console.log(`server on ${res.url} connected to MDB`);
  })
  .catch((er) => {
    console.error(er);
  });
