/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable import/extensions */
import ReactDOM from 'react-dom/client';
import './index.css';
import { ApolloProvider } from '@apollo/client';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { client } from './utils/apollo';
import { ROUTE_COMPONENT } from './routes/index';
import UserInfo from './components/UserInfo/index';
import Layout from './components/Layout';
import Login from './containers/Login';
import { routes } from './routes/menus';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <ApolloProvider client={client}>
    <BrowserRouter>
      <UserInfo>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Layout />}>
            {routes.map((item) => {
              const Component = ROUTE_COMPONENT[item.key];
              return (
                <Route path={item.path} key={item.key} element={<Component />} />
              );
            })}
          </Route>
        </Routes>
      </UserInfo>
    </BrowserRouter>
  </ApolloProvider>,
);
