const { projects, clients } = require("../sampleData.js");
const Project = require("../models/Project");
const Client = require("../models/Client");

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLSchema,
  GraphQLID,
  GraphQLList,
  GraphQLNonNull,
} = require("graphql");

// client type
const ClientType = new GraphQLObjectType({
  name: "Client",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    email: { type: GraphQLString },
    phone: { type: GraphQLString },
  }),
});

// projects type
const ProjectType = new GraphQLObjectType({
  name: "Project",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    description: { type: GraphQLString },
    status: { type: GraphQLString },
    clientId: { type: GraphQLString },

    //add relationship to client
    client: {
      type: ClientType,
      resolve(parent, args) {
        // return clients.find((client) => client.id === parent.clientId);
        return clients.findById(parent.clientId);
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
        // return clients;
        // mongoose all client get
        return Client.find();
      },
    },
    // for a single client by id
    client: {
      type: ClientType,
      args: { id: { type: GraphQLID } },
      resolve(parentValue, args) {
        // return clients.find((client) => client.id == args.id);
        // mongoose find client by id
        return Client.findById(args.id);
      },
    },

    // for all projects in the database
    projects: {
      type: new GraphQLList(ProjectType),
      resolve() {
        // return projects;
        // monogoose find all method
        return Project.find();
      },
    },
    // for a single project by id
    project: {
      type: ProjectType,
      args: { id: { type: GraphQLID } },
      resolve(parentValue, args) {
        // return projects.find((project) => project.id == args.id);
        // monogoose single one find method
        return Project.findById(args.id);
      },
    },
  },
});

//  Mutations
const mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    addClient: {
      type: ClientType,
      args: {
        name: { type: new GraphQLNonNull(GraphQLString) },
        email: { type: new GraphQLNonNull(GraphQLString) },
        phone: { type: new GraphQLNonNull(GraphQLString) },
      },
      resolve(parentValue, args) {
        // mongoose create method
        return new Client({
          name: args.name,
          email: args.email,
          phone: args.phone,
        }).save();
      },
    },

    // delete a client
    deleteClient: {
      type: ClientType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLID) },
      },
      resolve(parentValue, args) {
        // mongoose delete method
        return Client.findByIdAndRemove(args.id);
      },
    },
  },
});

// module exports
module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation,
});
