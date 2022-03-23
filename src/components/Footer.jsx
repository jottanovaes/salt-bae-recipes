import React from 'react';
import { Link } from 'react-router-dom';
import PropType from 'prop-types';
import mealIcon from '../images/mealIcon.svg';
import exploreIcon from '../images/exploreIcon.svg';
import drinkIcon from '../images/drinkIcon.svg';
import { StyledFotter, StyledImg } from './style';

export default function Footer({ page }) {
  return (
    <StyledFotter
      data-testid="footer"
      style={ {
        display: 'flex',
        position: 'fixed',
        justifyContent: 'space-around',
        bottom: '0px',
        width: '100%',
      } }
    >
      <Link to="/foods">
        <StyledImg
          name="meals"
          page={ page }
          src={ mealIcon }
          alt="mealIcon"
          data-testid="food-bottom-btn"
        />
      </Link>
      <Link to="/drinks">
        <StyledImg
          name="drinks"
          page={ page }
          src={ drinkIcon }
          alt="drinkIcon"
          data-testid="drinks-bottom-btn"
        />
      </Link>
      <Link to="/explore">
        <StyledImg
          name="explore"
          page={ page }
          src={ exploreIcon }
          alt="exploreIcon"
          data-testid="explore-bottom-btn"
        />
      </Link>
    </StyledFotter>
  );
}

Footer.propTypes = {
  page: PropType.string.isRequired,
};
