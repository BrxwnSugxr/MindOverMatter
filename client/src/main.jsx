import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import {
  ApolloClient,
  ApolloProvider,
  InMemoryCache,
  createHttpLink,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import './index.css';
import { AuthProvider } from './context/AuthContext';
import { createUploadLink } from 'apollo-upload-client';

const authLink = setContext((_, { headers }) => {
  const token = JSON.parse(localStorage.getItem('user'))?.token;
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const uploadLink = createUploadLink({
  //uri: 'http://localhost:3030/graphql',
  uri: '/graphql',
});

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: authLink.concat(uploadLink),
});

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <AuthProvider>
        <App />
      </AuthProvider>
    </ApolloProvider>
  </React.StrictMode>
);
