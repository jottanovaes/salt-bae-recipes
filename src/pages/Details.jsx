/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import RecipesContext from '../Context/context';
import { fetchById } from '../services/search';
import RecipeDetails from '../components/RecipeDetails';

export default function Details({ history }) {
  const { recipeDetails, setRecipeDetails, getIngredients } = useContext(RecipesContext);

  const [ingredients, setIngredients] = useState([]);
  const [measure, setMeasure] = useState([]);

  const { pathname } = history.location;
  const type = pathname.split('/')[1] === 'drinks' ? 'drinks' : 'meals';
  const idRecipe = pathname.split('/')[2];

  useEffect(() => {
    if (!ingredients.length) getIngredients(setIngredients, setMeasure);
  }, [recipeDetails]);

  useEffect(() => {
    fetchById(idRecipe, type, setRecipeDetails);
  }, []);

  return (
    recipeDetails.length > 0 && (
      <RecipeDetails
        ingredients={ ingredients }
        measure={ measure }
        idRecipe={ idRecipe }
        type={ type }
      />
    )
  );
}

Details.propTypes = {
  history: PropTypes.shape({
    location: PropTypes.shape({ pathname: PropTypes.string }).isRequired,
  }).isRequired,
};
