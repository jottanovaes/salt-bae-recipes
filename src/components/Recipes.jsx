import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import RecipesContext from '../Context/context';
import { keysByType } from '../constants';
import {
  Recipe,
  RecipeCategory,
  RecipeImg,
  RecipeInfo,
  RecipeList,
  RecipeName,
} from './style';

export default function Recipes({ type }) {
  const { fetchResult, actualFilter } = useContext(RecipesContext);
  const TOTAL_RECIPES = 12;
  const resultKeys = Object.keys(fetchResult);
  const keys = keysByType(type);
  return (
    resultKeys.length > 0 && (
      <RecipeList className="recipes-container">
        {fetchResult[type]
          && fetchResult[type].slice(0, TOTAL_RECIPES).map((recipe, index) => (
            <Link to={ `/${keys.type}/${recipe[keys.id]}` } key={ recipe[keys.id] }>
              <Recipe data-testid={ `${index}-recipe-card` }>
                <RecipeImg
                  src={ recipe[keys.image] }
                  style={ { width: '50px' } }
                  alt="Recipe"
                  data-testid={ `${index}-card-img` }
                />
                <RecipeInfo>
                  <RecipeName data-testid={ `${index}-card-name` }>
                    {recipe[keys.name]}
                  </RecipeName>
                  <RecipeCategory>
                    {actualFilter.replace('_', ' ') || recipe.strCategory}
                  </RecipeCategory>
                </RecipeInfo>
              </Recipe>
            </Link>
          ))}
      </RecipeList>
    )
  );
}

Recipes.propTypes = {
  type: PropTypes.string.isRequired,
};
