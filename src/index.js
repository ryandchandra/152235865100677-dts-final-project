import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

import { BrowserRouter, Routes, Route } from "react-router-dom";

import { Provider } from 'react-redux';
import { store } from "./app/store";

import Login from "./containers/Login";
import Register from "./containers/Register";
import ProtectedRoute from "./components/ProtectedRoute";
import NotFound from "./containers/NotFound";
import Home from './containers/Home';
import Search from './containers/Search';
import Random from './containers/Random';
import Detail from './containers/Detail';
import Categories from './containers/Categories';
import CategoryDetail from './containers/CategoryDetail';
import Ingredients from './containers/Ingredients';
import IngredientDetail from './containers/IngredientDetail';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />}>
            <Route path="category" element={<Categories />} />
            <Route path="category/:category" element={<CategoryDetail />} />
            <Route path="ingredient" element={<Ingredients />} />
            <Route path="ingredient/:ingredient" element={<IngredientDetail />} />
            <Route path="meal/:id" element={<ProtectedRoute><Detail /></ProtectedRoute>} />
            <Route path="search" element={<Search />} />
            <Route path="random" element={<Random />} />
            <Route
              path="login"
              element={
                <ProtectedRoute loginOnly={false}>
                  <Login />
                </ProtectedRoute>
              } />
            <Route
              path="register"
              element={
                <ProtectedRoute loginOnly={false}>
                  <Register />
                </ProtectedRoute>
              } />
              <Route path="/" element={<Home />} />
              <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </Provider>
	</React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
