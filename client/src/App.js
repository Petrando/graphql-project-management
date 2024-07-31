import { ApolloProvider, ApolloClient, InMemoryCache, from } from '@apollo/client';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import pages from "./pages"
import Header from "./components/Header"
import Clients from "./components/Clients"
import AddClientModal from './components/AddClientModal';

const { Home, NotFound, Project } = pages

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
      <Router>
      <Header />
        <div className="container">
        <Routes>
              <Route path='/' element={<Home />} />
              <Route path='/projects/:id' element={<Project />} />
              <Route path='*' element={<NotFound />} />
            </Routes>          
        </div>
      </Router>
    </ApolloProvider>
  );
}

export default App;
