import React, { useContext } from 'react';
import { useLocation } from 'react-router-dom';
import RecipesContext from '../Context/context';
import Ingredient from '../components/Ingredient';

const renderIngredients = (ingredients, type) => {
  const TWELVE = 12;
  const mealsOrDrinks = type === 'foods' ? 'meals' : 'drinks';

  if (ingredients[mealsOrDrinks]) {
    return ingredients[mealsOrDrinks]
      .slice(0, TWELVE)
      .map((ingredient, index) => (mealsOrDrinks === 'meals' ? (
        <Ingredient
          name={ ingredient.strIngredient }
          key={ ingredient.strIngredient }
          index={ index }
          type={ mealsOrDrinks }
        />
      ) : (
        <Ingredient
          name={ ingredient.strIngredient1 }
          key={ ingredient.strIngredient1 }
          index={ index }
          type={ mealsOrDrinks }
        />
      )));
  }
};

export default function DrinksIngredients() {
  const { ingredients } = useContext(RecipesContext);
  const { pathname } = useLocation();

  const splitedPathName = pathname.split('/')[2];

  return <div>{renderIngredients(ingredients, splitedPathName)}</div>;
}
