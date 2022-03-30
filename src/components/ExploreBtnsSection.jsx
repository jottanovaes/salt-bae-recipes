import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router';
import { fetchRandomRecipe } from '../services/search';
import { ExplorerContainer } from '../pages/style';
import { StartBtn } from './style';

const ExploreBtnsSection = ({ type }) => {
  const [recipeId, setRecipeId] = useState('');
  const history = useHistory();

  useEffect(() => {
    fetchRandomRecipe(type, setRecipeId);
  }, [type]);

  return (
    <ExplorerContainer>
      <StartBtn
        type="button"
        data-testid="explore-by-ingredient"
        onClick={ () => history.push(`/explore/${type}/ingredients`) }
      >
        By Ingredient
      </StartBtn>
      <StartBtn
        type="button"
        data-testid="explore-surprise"
        onClick={ () => {
          history.push(`/${type}/${recipeId}`);
        } }
      >
        Surprise me!
      </StartBtn>
      { (type === 'foods')
    && (
      <StartBtn
        type="button"
        data-testid="explore-by-nationality"
        onClick={ () => history.push('/explore/foods/nationalities') }
      >
        By Nationality
      </StartBtn>
    )}
    </ExplorerContainer>
  );
};

ExploreBtnsSection.propTypes = {
  type: PropTypes.string.isRequired,
};

export default ExploreBtnsSection;
