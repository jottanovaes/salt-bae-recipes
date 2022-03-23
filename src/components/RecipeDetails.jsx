/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useHistory, useLocation } from 'react-router-dom';
import RecipesContext from '../Context/context';
import shareIcon from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import IngredientsList from './IngredientsList';
import DetailsContent from './DetailsContent';
import backButton from '../assets/icons/arrow_back.svg';
import { CARROUSEL_LENGTH, keysByType } from '../constants';
import { setFavoriteLocal, shareButton } from '../services/sharedfunctions';
import { Button, BackButton, ButtonsContainer, ThumbContainer,
  DetailsTitle, Thumb, DetailsContainer, Title, Category,
  TextContainer, StartBtn, ButtonContainer } from './style';

export default function RecipeDetails({
  ingredients,
  measure,
  idRecipe,
  type,
}) {
  const {
    recipeDetails,
    fetchResult,
    linkCopied,
    favorite,
    checkFavorite,
    favoriting,
    enableFinishButton,
    recipeDone,
    checkProgress,
    setLinkCopied,
  } = useContext(RecipesContext);

  const { localKey } = keysByType(type);

  const [recipeProgress, setRecipeProgress] = useState(false);
  const [recipeFinished, setRecipeFinished] = useState(false);

  const history = useHistory();
  const { pathname } = useLocation();
  const inProgressPage = pathname.includes('progress');
  const carrouselType = type === 'drinks' ? 'meals' : 'drinks';

  let carrousel = [];

  if (fetchResult[carrouselType]) {
    carrousel = fetchResult[carrouselType].slice(0, CARROUSEL_LENGTH);
  }

  const handleStartRecipe = () => {
    if (!inProgressPage) history.push(`${idRecipe}/in-progress`);
  };

  const handleFinishRecipe = () => {
    history.push('/done-recipes');
  };

  const keys = keysByType(type);

  useEffect(() => {
    enableFinishButton(recipeProgress, localKey, idRecipe, setRecipeFinished);
  }, [recipeProgress]);

  useEffect(() => {
    checkProgress(idRecipe, setRecipeProgress, localKey);
    checkFavorite(idRecipe);
    recipeDone(setRecipeFinished, idRecipe);
  }, []);

  return (
    <>
      <BackButton type="button" onClick={ () => history.goBack() }>
        <img src={ backButton } alt="Back" />
      </BackButton>
      {recipeDetails.length > 0
        && recipeDetails.map((recipe) => (
          <DetailsContainer key={ recipe[keys.id] }>
            <ThumbContainer src={ recipe[keys.image] }>
              <Thumb
                src={ recipe[keys.image] }
                alt={ recipe[keys.name] }
                data-testid="recipe-photo"
              />
            </ThumbContainer>
            <DetailsTitle>
              <TextContainer>
                <Title data-testid="recipe-title">{recipe[keys.name]}</Title>
                <Category data-testid="recipe-category">
                  {type === 'drinks' ? 'Alcoholic' : recipe.strCategory}
                </Category>
              </TextContainer>
              <ButtonsContainer>
                <Button
                  type="button"
                  onClick={ () => shareButton(setLinkCopied) }
                  data-testid="share-btn"
                >
                  <img src={ shareIcon } alt={ recipe[keys.name] } />
                  {linkCopied}
                </Button>
                <Button
                  type="button"
                  onClick={ () => favoriting(idRecipe, type, setFavoriteLocal) }
                >
                  <img
                    src={ favorite ? blackHeartIcon : whiteHeartIcon }
                    alt={ recipe[keys.name] }
                    data-testid="favorite-btn"
                  />
                </Button>
              </ButtonsContainer>
            </DetailsTitle>
            <DetailsTitle>
              <TextContainer>
                <Title>Ingredients</Title>
                {IngredientsList({
                  ingredients,
                  measure,
                  inProgressPage,
                  recipeProgress,
                  setRecipeProgress,
                  idRecipe,
                  localKey,
                })}
              </TextContainer>
            </DetailsTitle>
            <Title>Instructions</Title>
            <Category data-testid="instructions">{recipe.strInstructions}</Category>
            {!inProgressPage && (
              <DetailsContent
                carrousel={ carrousel }
                recipeDetails={ recipeDetails }
                type={ carrouselType }
              />
            )}
          </DetailsContainer>
        ))}
      <ButtonContainer>
        {inProgressPage ? (

          <StartBtn
            data-testid="finish-recipe-btn"
            type="button"
            name="Finish"
            style={ {
              justifyContent: 'space-around',
            } }
            onClick={ handleFinishRecipe }
            disabled={ recipeFinished }
          >
            Finish Recipe
          </StartBtn>
        ) : (
          <StartBtn
            data-testid="start-recipe-btn"
            type="button"
            name={ recipeProgress ? 'Continue' : 'Start' }
            style={ {
              justifyContent: 'space-around',
            } }
            onClick={ handleStartRecipe }
          >
            {recipeProgress ? 'Continue Recipe' : 'Start Recipe'}
          </StartBtn>
        )}
      </ButtonContainer>
    </>
  );
}

RecipeDetails.propTypes = {
  ingredients: PropTypes.arrayOf,
  measure: PropTypes.arrayOf,
  idRecipe: PropTypes.string,
  type: PropTypes.string,
}.isRequired;
