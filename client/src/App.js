import { ApolloProvider, ApolloClient, InMemoryCache } from '@apollo/client';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from "./components/Header"
import Clients from "./components/Clients"
import AddClientModal from './components/AddClientModal';
import Projects from './components/Projects';
const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        clients: {
          merge(existing, incoming) {
            return incoming;
          },
        },
        projects: {
          merge(existing, incoming) {
            return incoming;
          },
        },
      },
    },
  },
});

const client = new ApolloClient({
  uri: 'http://localhost:8000/graphql',
  cache
});

function App() {
  return (
    <ApolloProvider client={client}>
      <Header />
      <div className="container">
        <header className="App-header">
          Hello World
        </header>
        <AddClientModal />
        <Clients />
        <Projects />
      </div>
    </ApolloProvider>
  );
}

export default App;
