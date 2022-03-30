import React, { useContext } from 'react';
import { useLocation } from 'react-router-dom';
import RecipesContext from '../Context/context';
import Ingredient from '../components/Ingredient';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { IngredientsList } from './style';

const renderIngredients = (ingredients, type) => {
  const TWELVE = 12;
  const mealsOrDrinks = type === 'foods' ? 'meals' : 'drinks';

  if (ingredients[mealsOrDrinks]) {
    return ingredients[mealsOrDrinks]
      .slice(0, TWELVE)
      .map((ingredient, index) => (
        <Ingredient
          name={
            mealsOrDrinks === 'meals'
              ? ingredient.strIngredient
              : ingredient.strIngredient1
          }
          key={
            mealsOrDrinks === 'meals'
              ? ingredient.strIngredient
              : ingredient.strIngredient1
          }
          index={ index }
          type={ mealsOrDrinks }
        />
      ));
  }
};

export default function Ingredients() {
  const { ingredients } = useContext(RecipesContext);
  const { pathname } = useLocation();

  const splitedPathName = pathname.split('/')[2];
  const mealsOrDrinks = splitedPathName === 'foods' ? 'meals' : 'drinks';
  return (
    <div>
      <Header title="Explore Ingredients" />
      <IngredientsList>{renderIngredients(ingredients, splitedPathName)}</IngredientsList>
      <Footer page={ mealsOrDrinks } />
    </div>
  );
}
