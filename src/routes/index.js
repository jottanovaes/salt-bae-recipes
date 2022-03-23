import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Login from '../pages/Login';
import Foods from '../pages/Foods';
import Drinks from '../pages/Drinks';
import Explore from '../pages/Explore';
import ExploreFoods from '../pages/ExploreFoods';
import ExploreDrinks from '../pages/ExploreDrinks';
import Ingredients from '../pages/Ingredients';
// import DrinksIngredients from '../pages/DrinksIngredients';
import Nationalities from '../pages/Nationalities';
import Profile from '../pages/Profile';
import DoneRecipes from '../pages/DoneRecipes';
import FavoriteRecipes from '../pages/FavoriteRecipes';
import NotFound from '../pages/NotFound';
import Details from '../pages/Details';

function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={ Login } />
        <Route exact path="/drinks" component={ Drinks } />
        <Route exact path="/foods" component={ Foods } />
        <Route exact path="/explore" component={ Explore } />
        <Route exact path="/explore/foods" component={ ExploreFoods } />
        <Route exact path="/explore/drinks" component={ ExploreDrinks } />
        <Route path="/explore/foods/ingredients" component={ Ingredients } />
        <Route path="/explore/drinks/ingredients" component={ Ingredients } />
        <Route path="/explore/foods/nationalities" component={ Nationalities } />
        <Route exact path="/profile" component={ Profile } />
        <Route path="/done-recipes" component={ DoneRecipes } />
        <Route path="/favorite-recipes" component={ FavoriteRecipes } />
        <Route exact path="/foods/:id" component={ Details } />
        <Route exact path="/drinks/:id" component={ Details } />
        <Route exact path="/foods/:id/in-progress" component={ Details } />
        <Route exact path="/drinks/:id/in-progress" component={ Details } />
        <Route path="*" component={ NotFound } />
      </Switch>
    </BrowserRouter>
  );
}

export default Routes;
