/* eslint-disable import/extensions */
import ReactDOM from 'react-dom/client';
import './index.css';
import { ApolloProvider } from '@apollo/client';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { client } from './utils/apollo';
import { ROUTE_CONFIG } from './routes/index';
import UserInfo from './components/UserInfo/index';
import Layout from './components/Layout';
import Login from './containers/Login';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <ApolloProvider client={client}>
    <BrowserRouter>
      <UserInfo>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Layout />}>
            {ROUTE_CONFIG.map((item) => (
              <Route path={item.path} key={item.key} element={<item.element />} />
            ))}
          </Route>
        </Routes>
      </UserInfo>
    </BrowserRouter>
  </ApolloProvider>,
);
