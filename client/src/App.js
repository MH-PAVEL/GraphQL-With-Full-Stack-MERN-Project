import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import Clients from "./components/Clients";
import Header from "./components/Header";

const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        clients: {
          marge(existing, incoming) {
            return incoming;
          },
        },

        projects: {
          marge(existing, incoming) {
            return incoming;
          },
        },
      },
    },
  },
});

const client = new ApolloClient({
  uri: "http://localhost:8000/graphql",
  cache,
  // cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <Header>
        <Clients />
      </Header>
    </ApolloProvider>
  );
}

export default App;
