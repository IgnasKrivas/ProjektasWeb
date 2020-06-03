import React, { useState, useEffect } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

import Home from './components/pages/Home';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import UserContext from './context/UserContext';
import NavBar from './components/layout/NavBar';

import Recipes from './components/recipes.component';
import CreateRecipe from './components/create-recipe.component';
import CreateIngredient from './components/create-ingredient.component';
import Get from './components/get-ingredient.component';
import EditRecipe from './components/edit-recipe.component';
import InspectRecipe from './components/showonerecipe';
import Calculator from './components/Calculator';

import './style.css';
import './App.css';

export default function App() {
  const [userData, setUserData] = useState({
    token: undefined,
    user: undefined,
  });

  useEffect(() => {
    const checkLoggedIn = async () => {
      let token = localStorage.getItem('auth-token');
      if (token === null) {
        localStorage.setItem('auth-token', '');
        token = '';
      }
      const tokenRes = await Axios.post(
        'http://localhost:8080/tokenIsValid',
        null,
        { headers: { 'x-auth-token': token } }
      );

      if (tokenRes.data) {
        const userRes = await Axios.get('http://localhost:8080/user', {
          headers: { 'x-auth-token': token },
        });

        setUserData({
          token,
          user: userRes.data,
        });
      }
    };
    checkLoggedIn();
  }, []);

  return (
    <>
      <BrowserRouter>
        <div className="container">
          <UserContext.Provider value={{ userData, setUserData }}>
            <NavBar />
            <Switch>
              <Route exact path="/" component={Home} />
              <Route path="/login" component={Login} />
              <Route path="/register" component={Register} />
              <Route path="/create" exact component={CreateRecipe} />
              <Route path="/recipe" exact component={Recipes} />
              <Route path="/calculator" exact component={Calculator} />
              <Route path="/ingredient" exact component={CreateIngredient} />
              <Route path="/get" exact component={Get} />
              <Route path="/edit/:id" component={EditRecipe} />
              <Route path="/inspect/:id" component={InspectRecipe} />
            </Switch>
          </UserContext.Provider>
        </div>
      </BrowserRouter>
    </>
  );
}
