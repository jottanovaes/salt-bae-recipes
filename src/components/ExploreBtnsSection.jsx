import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router';
import { fetchRandomRecipe } from '../services/search';

const ExploreBtnsSection = ({ type }) => {
  const [recipeId, setRecipeId] = useState('');
  const history = useHistory();

  useEffect(() => {
    fetchRandomRecipe(type, setRecipeId);
  }, [type]);

  return (
    <section>
      <button
        type="button"
        data-testid="explore-by-ingredient"
        onClick={ () => history.push(`/explore/${type}/ingredients`) }
      >
        By Ingredient
      </button>
      <button
        type="button"
        data-testid="explore-surprise"
        onClick={ () => {
          history.push(`/${type}/${recipeId}`);
        } }
      >
        Surprise me!
      </button>
      { (type === 'foods')
    && (
      <button
        type="button"
        data-testid="explore-by-nationality"
        onClick={ () => history.push('/explore/foods/nationalities') }
      >
        By Nationality
      </button>
    )}
    </section>
  );
};

ExploreBtnsSection.propTypes = {
  type: PropTypes.string.isRequired,
};

export default ExploreBtnsSection;
