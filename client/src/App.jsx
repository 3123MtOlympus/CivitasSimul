import './App.css';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { Outlet, useLocation } from 'react-router-dom';
import React from 'react';



import Header from './components/Header';
// import Footer from './components/Footer';


// Construct our main GraphQL API endpoint
const httpLink = createHttpLink({
  uri: '/graphql',
});

// Construct request middleware that will attach the JWT token to every request as an `authorization` header
const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem('id_token');
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const client = new ApolloClient({
  // Set up our client to execute the `authLink` middleware prior to making the request to our GraphQL API
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

function App() {

const location = useLocation().pathname
console.log(location)

  return (
    <ApolloProvider client={client}>
      <div className={location === "/package" ? "otherBG" : location === "/board" ? "thirdBG" : location === "/tools" ? "fourthBG" : location === "/" ? "imageBG" : "imageBG" } >
        <Header />
       
        <div className="container">
          <Outlet />
        </div>
        {/* <Footer /> */}
      </div>
    </ApolloProvider>
  );
}

function Notify(){
  const [userName, setUserName] = useState('');

  const handleNotify = async () => {
    try {
      await axios.post('/api/notify', { userName });
      alert(`Package for ${userName} has arrived! Notification sent.`);
    } catch (error) {
      console.error(error);
      alert('Error notifying user');
    }
  };

  return (
    <div className="App">
      <h1>Package Notification System</h1>
      <input
        type="text"
        placeholder="Enter Unit Number"
        value={userName}
        onChange={(e) => setUnitNumber(e.target.value)}
      />
      <button onClick={handleNotify}>Notify User</button>
    </div>
  );
}

export default App;
