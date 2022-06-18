const { projects, clients } = require("../sampleData.js");
const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLSchema,
  GraphQLID,
  GraphQLList,
  GraphQLInt,
  GraphQLNonNull,
} = require("graphql");

// client type
const ClientType = new GraphQLObjectType({
  name: "Client",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    description: { type: GraphQLString },
    status: { type: GraphQLString },
    clientId: { type: GraphQLString },
  }),
});

// projects type
const ProjectType = new GraphQLObjectType({
  name: "Project",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    email: { type: GraphQLString },
    phone: { type: GraphQLString },

    //add relationship to client
    client: {
      type: ClientType,
      resolve(parent, args) {
        return clients.find((client) => client.id === parent.clientId);
      },
    },
  }),
});

// create rootQuery
const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    // for all clients in the database
    clients: {
      type: new GraphQLList(ClientType),
      resolve() {
        return clients;
      },
    },
    // for a single client by id
    client: {
      type: ClientType,
      args: { id: { type: GraphQLID } },
      resolve(parentValue, args) {
        return clients.find((client) => client.id == args.id);
      },
    },

    // for all projects in the database
    projects: {
      type: new GraphQLList(ProjectType),
      resolve() {
        return projects;
      },
    },
    // for a single project by id
    project: {
      type: ProjectType,
      args: { id: { type: GraphQLID } },
      resolve(parentValue, args) {
        return projects.find((project) => project.id == args.id);
      },
    },
  },
});

// module exports
module.exports = new GraphQLSchema({
  query: RootQuery,
});
