import React, { useContext } from 'react';
import propTypes from 'prop-types';
import RecipesContext from '../Context/context';
import { IngredientItem } from './style';

export default function IngredientsList({
  ingredients,
  measure,
  inProgressPage,
  recipeProgress,
  setRecipeProgress,
  idRecipe,
  localKey,
}) {
  const { useSetInProgress } = useContext(RecipesContext);

  const handleChange = ({ checked, name }, index) => {
    const localProgress = JSON.parse(localStorage.getItem('inProgressRecipes'));
    const ingredientsSpliced = recipeProgress[localKey][idRecipe];
    let newName = '';
    if (!checked) {
      newName = name.replace('!', '');
    } else {
      newName = `!${name}`;
    }
    ingredientsSpliced.splice(index, 1, newName);
    localStorage.setItem(
      'inProgressRecipes',
      JSON.stringify({
        ...localProgress,
        [localKey]: { ...localProgress[localKey],
          [idRecipe]: ingredientsSpliced },
      }),
    );
    setRecipeProgress((prevState) => ({
      ...prevState,
      [localKey]: { ...prevState[localKey],
        [idRecipe]: ingredientsSpliced },
    }));
  };
  useSetInProgress({
    ingredients,
    measure,
    localKey,
    idRecipe,
    setRecipeProgress,
    inProgressPage,
  });
  return !inProgressPage
    ? ingredients.map((ingredient, index) => (
      <IngredientItem
        key={ index }
        data-testid={ `${index}-ingredient-name-and-measure` }
      >
        {ingredient}
        <label
          htmlFor={ `${index}-ingredient-step` }
        >
          {measure[index]}
        </label>
      </IngredientItem>
    ))
    : recipeProgress
        && recipeProgress[localKey][idRecipe].map((ingredient, index) => (
          <IngredientItem
            key={ index }
            line={ ingredient.includes('!') }
          >
            <label
              data-testid={ `${index}-ingredient-step` }
              htmlFor={ `${index}-ingredient-step` }
            >
              <input
                type="checkbox"
                id={ `${index}-ingredient-step` }
                name={ ingredient }
                checked={ ingredient.includes('!') }
                onChange={ ({ target }) => handleChange(target, index) }
              />
              {' '}
              {ingredient.replace('!', '').split('-')[0]}
            </label>
            <label
              htmlFor={ `${index}-ingredient-step` }
            >
              {ingredient.replace('!', '').split('-')[1]}
            </label>
          </IngredientItem>
        ));
}

IngredientsList.propTypes = {
  Ingredients: propTypes.arrayOf[propTypes.string],
}.isRequired;
