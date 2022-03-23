import React, { useContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import RecipesContext from '../Context/context';
import shareIcon from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';

function setFavoriteLocal(favoritesList, favObj, setFavorite) {
  if (favoritesList) {
    const parsedList = JSON.parse(favoritesList);
    localStorage.setItem(
      'favoriteRecipes',
      JSON.stringify([...parsedList, favObj]),
    );
    setFavorite(true);
  } else {
    localStorage.setItem('favoriteRecipes', JSON.stringify([favObj]));
    setFavorite(true);
  }
}

function favoritingFood(setFavorite, favorite, idRecipe, recipeDetails) {
  if (favorite) {
    const favoritesList = localStorage.getItem('favoriteRecipes');
    const favoriteFilter = JSON.parse(favoritesList).filter(
      (favorito) => favorito.id !== idRecipe,
    );
    setFavorite(false);
    localStorage.setItem('favoriteRecipes', JSON.stringify(favoriteFilter));
  } else {
    const favObj = {
      id: idRecipe,
      type: 'drink',
      nationality: '',
      category: recipeDetails[0].strCategory,
      alcoholicOrNot: recipeDetails[0].strAlcoholic,
      name: recipeDetails[0].strDrink,
      image: recipeDetails[0].strDrinkThumb,
    };
    const favoritesList = localStorage.getItem('favoriteRecipes');
    setFavoriteLocal(favoritesList, favObj, setFavorite);
  }
}

export default function DrinksDetails({ ingredients, measure, idRecipe }) {
  const { recipeDetails,
    fetchResult, setFavorite,
    favorite } = useContext(RecipesContext);
  const { meals } = fetchResult;
  const history = useHistory();
  const CAROUSEL_LENGTH = 6;
  const LINK_COPIED_TIMEOUT = 2000;

  let mealsCarrousel = [];
  const [recipeProgress, setRecipeProgress] = useState(false);
  const [recipeFinished, setRecipeFinished] = useState(false);
  const [linkCopied, setLinkCopied] = useState('');

  if (meals) {
    mealsCarrousel = meals.slice(0, CAROUSEL_LENGTH);
  }

  function shareButton() {
    setLinkCopied('Link copied!');
    navigator.clipboard.writeText(window.location.href);
    setTimeout(() => {
      setLinkCopied('');
    }, LINK_COPIED_TIMEOUT);
  }

  useEffect(() => {
    function recipeDone() {
      const checkDone = localStorage.getItem('doneRecipes');
      if (checkDone) {
        const parsedDone = JSON.parse(checkDone);
        setRecipeFinished(parsedDone.some((recipe) => recipe.id === idRecipe));
      }
    }

    function checkProgress() {
      const checkDone = localStorage.getItem('inProgressRecipes');
      if (checkDone && JSON.parse(checkDone).cocktails[idRecipe]) {
        setRecipeProgress(true);
      }
    }
    function checkFavorite() {
      const favoritesList = localStorage.getItem('favoriteRecipes');
      if (favoritesList && favoritesList.length > 0) {
        const checking = JSON.parse(favoritesList).some(
          (favorito) => favorito.id === idRecipe,
        );
        setFavorite(checking);
      }
    }
    checkProgress();
    recipeDone();
    checkFavorite();
  }, [idRecipe, setFavorite]);

  return (
    <>
      {console.log('recipe details:', recipeDetails)}
      {recipeDetails.length > 0
        && recipeDetails.map((recipe) => (
          <div key={ recipe.idDrink } style={ { paddingBottom: '30px' } }>
            <img
              src={ recipe.strDrinkThumb }
              alt={ recipe.strDrink }
              style={ { width: '40vh' } }
              data-testid="recipe-photo"
            />
            <h3 data-testid="recipe-title">{recipe.strDrink}</h3>
            <h5 data-testid="recipe-category">{recipe.strAlcoholic}</h5>
            <button
              type="button"
              onClick={ () => shareButton() }
              data-testid="share-btn"
            >
              <img src={ shareIcon } alt={ recipe.strDrink } />
              {linkCopied}
            </button>
            <button
              type="button"
              onClick={ () => favoritingFood(
                setFavorite,
                favorite,
                idRecipe,
                recipeDetails,
              ) }
            >
              <img
                src={ favorite ? blackHeartIcon : whiteHeartIcon }
                alt={ recipe.strDrink }
                data-testid="favorite-btn"
              />
            </button>
            <h5>Ingredients:</h5>
            {ingredients.map((ingrediente, index) => (
              <div
                key={ index }
                data-testid={ `${index}-ingredient-name-and-measure` }
              >
                {ingrediente}
                {' '}
                {measure[index]}
              </div>
            ))}
            <h5>Instructions:</h5>
            <p data-testid="instructions">{recipe.strInstructions}</p>
            <div
              style={ {
                className: 'carousel',
                overflow: 'hidden',
                maxWidth: '80%',
              } }
            >
              <div
                className="inner"
                style={ {
                  display: 'flex',
                  whiteSpace: 'nowrap',
                  overflowX: 'scroll',
                } }
              >
                {mealsCarrousel.map((meal, index) => (
                  <div
                    key={ index }
                    id={ index }
                    style={ {
                      padding: '0px',
                      alignItems: 'center',
                      justifyContent: 'center',
                      margin: '0px 30px',
                    } }
                  >
                    <div data-testid={ `${index}-recomendation-card` }>
                      <img
                        src={ meal.strMealThumb }
                        style={ { width: '80px' } }
                        alt="Recipe"
                      />
                      <p data-testid={ `${index}-recomendation-title` }>
                        {meal.strMeal}
                      </p>
                      <p>{meal.strAlcoholic}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      {recipeFinished ? (
        ''
      ) : (
        <button
          data-testid="start-recipe-btn"
          type="button"
          style={ {
            display: 'block',
            position: 'fixed',
            justifyContent: 'space-around',
            bottom: '0px',
            width: '100%',
            height: '5vh',
          } }
          onClick={ () => history.push(`${idRecipe}/in-progress`) }
        >
          {recipeProgress ? 'Continue Recipe' : 'Start Recipe'}
        </button>
      )}
    </>
  );
}

DrinksDetails.propTypes = {
  ingredients: PropTypes.arrayOf,
  measure: PropTypes.arrayOf,
  idRecipe: PropTypes.string,
}.isRequired;
