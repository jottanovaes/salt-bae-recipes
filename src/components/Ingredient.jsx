import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { IngrendItem } from '../pages/style';

export default function Ingredient({ index, name, type }) {
  const src = {
    meals: `https://www.themealdb.com/images/ingredients/${name}-Small.png`,
    drinks: `https://www.thecocktaildb.com/images/ingredients/${name}-Small.png`,
  };

  const drinkOrFoods = type === 'meals' ? 'foods' : 'drinks';

  return (
    <Link
      to={ { pathname: `/${drinkOrFoods}`, state: name } }
    >
      <IngrendItem data-testid={ `${index}-ingredient-card` }>
        <img
          src={ src[type] }
          alt={ `Ingredient - ${name}` }
          data-testid={ `${index}-card-img` }
        />
        <span
          data-testid={ `${index}-card-name` }
        >
          {name}
        </span>
      </IngrendItem>
    </Link>
  );
}

Ingredient.propTypes = {
  index: PropTypes.string,
  type: PropTypes.string,
  name: PropTypes.string,
}.isRequired;
