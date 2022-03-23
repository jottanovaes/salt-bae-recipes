import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import RecipesContext from './context';
import { fetchLoad } from '../services/search';
import { FAV_OBJ, MIN_PASSWORD_LENGTH, VALID_EMAIL } from '../constants';

function RecipesProvider({ children }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginEnabled, setLoginEnabled] = useState(true);
  const [inputSearch, setInputSearch] = useState('');
  const [fetchResult, setFetchResult] = useState({});
  const [recipeDetails, setRecipeDetails] = useState([]);
  const [redirect, setRedirect] = useState([]);
  const [filters, setFilters] = useState({});
  const [ingredients, setIngredients] = useState([]);
  const [linkCopied, setLinkCopied] = useState('');
  const [favorite, setFavorite] = useState(false);
  const [actualFilter, setActualFilter] = useState('All');

  useEffect(() => {
    fetchLoad(setFetchResult, setFilters, setIngredients);
  }, []);

  useEffect(() => {
    if (VALID_EMAIL.test(email) && password.length > MIN_PASSWORD_LENGTH) {
      setLoginEnabled(false);
    } else { setLoginEnabled(true); }
  }, [email, password]);

  function favoriting(idRecipe, type, setFavoriteLocal) {
    if (favorite) {
      const favoritesList = localStorage.getItem('favoriteRecipes');
      const favoriteFilter = JSON.parse(favoritesList)
        .filter((favorited) => favorited.id !== idRecipe);
      setFavorite(false);
      localStorage.setItem('favoriteRecipes', JSON.stringify(favoriteFilter));
    } else {
      const favObj = FAV_OBJ(idRecipe, recipeDetails, type);
      const favoritesList = localStorage.getItem('favoriteRecipes');
      setFavoriteLocal(favoritesList, favObj, setFavorite);
    }
  }

  function measureIngredientsFilter(recipe, setIngredientsFunc, setMeasure) {
    const empty = recipe[1] !== null && recipe[1] !== '';
    if (recipe[0].includes('gredien') && empty) {
      setIngredientsFunc((prevState) => [...prevState, recipe[1]]);
    }
    if (recipe[0].includes('easure') && empty) {
      setMeasure((prevState) => [...prevState, recipe[1]]);
    }
  }

  function getIngredients(setIngredientsFunc, setMeasure) {
    if (recipeDetails[0] !== undefined) {
      const recipeEntries = Object.entries(recipeDetails[0]);
      recipeEntries.forEach((recipe) => {
        measureIngredientsFilter(recipe, setIngredientsFunc, setMeasure);
      });
    }
  }

  function enableFinishButton(recipeProgress, type, idRecipe, setRecipeFinished) {
    if (recipeProgress) {
      const ingredientsLength = recipeProgress[type][idRecipe].length;
      const strokedIngredients = recipeProgress[type][idRecipe]
        .filter((Ingredients) => Ingredients.includes('!')).length;
      setRecipeFinished(ingredientsLength !== strokedIngredients);
    }
  }

  function recipeDone(setRecipeFinished, idRecipe) {
    const checkDone = localStorage.getItem('doneRecipes');
    if (checkDone) {
      const parsedDone = JSON.parse(checkDone);
      setRecipeFinished(parsedDone.some((recipe) => recipe.id === idRecipe));
    }
  }

  function checkProgress(idRecipe, setRecipeProgress, localKey) {
    const checkDone = JSON.parse(localStorage.getItem('inProgressRecipes'));
    if (
      checkDone
      && checkDone[localKey]
      && Object.keys(checkDone[localKey]).includes(idRecipe)
    ) {
      setRecipeProgress((prevState) => ({
        ...prevState,
        [localKey]: {
          ...prevState[localKey],
          [idRecipe]: [...checkDone[localKey][idRecipe]],
        },
      }));
    }
  }

  function setIngredientsifNotEmpty({
    inProgressRecipes,
    localKey,
    idRecipe,
    IngredientsArray,
    setRecipeProgress,
  }) {
    if (inProgressRecipes[localKey]) {
      if (!Object.keys(inProgressRecipes[localKey]).includes(idRecipe)) {
        localStorage.setItem(
          'inProgressRecipes',
          JSON.stringify({
            ...inProgressRecipes,
            [localKey]: {
              ...inProgressRecipes[localKey],
              [idRecipe]: IngredientsArray,
            },
          }),
        );
        setRecipeProgress((prevState) => ({
          ...prevState,
          [localKey]: { ...prevState[localKey], [idRecipe]: IngredientsArray },
        }));
      } else {
        setRecipeProgress((prevState) => ({
          ...prevState,
          [localKey]: {
            ...prevState[localKey],
            [idRecipe]: inProgressRecipes[localKey][idRecipe],
          },
        }));
      }
    } else {
      localStorage.setItem(
        'inProgressRecipes',
        JSON.stringify({
          ...inProgressRecipes,
          [localKey]: {
            ...inProgressRecipes[localKey],
            [idRecipe]: IngredientsArray,
          },
        }),
      );
      setRecipeProgress((prevState) => ({
        ...prevState,
        [localKey]: { ...prevState[localKey], [idRecipe]: IngredientsArray },
      }));
    }
  }

  function setIngredientsIfLocalAreEmpty({ localKey,
    idRecipe,
    IngredientsArray,
    setRecipeProgress,
  }) {
    localStorage.setItem(
      'inProgressRecipes',
      JSON.stringify({
        [localKey]: { [idRecipe]: IngredientsArray },
      }),
    );
    setRecipeProgress({
      [localKey]: { [idRecipe]: IngredientsArray },
    });
  }

  function useSetInProgress({
    ingredients: Ingredients, measure, localKey, idRecipe, setRecipeProgress,
    inProgressPage,
  }) {
    useEffect(() => {
      function handleStart() {
        const inProgressRecipes = JSON.parse(
          localStorage.getItem('inProgressRecipes'),
        );
        const IngredientsArray = Ingredients.map(
          (ingredient, index) => `${ingredient} - ${measure[index]}`,
        );
        if (IngredientsArray.length) {
          if (inProgressRecipes) {
            setIngredientsifNotEmpty({ inProgressRecipes,
              localKey,
              idRecipe,
              IngredientsArray,
              setRecipeProgress,
            });
          } else {
            setIngredientsIfLocalAreEmpty({ localKey,
              idRecipe,
              IngredientsArray,
              setRecipeProgress,
            });
          }
        }
      }
      if (inProgressPage) handleStart();
    }, [idRecipe, Ingredients, measure, setRecipeProgress, localKey, inProgressPage]);
  }

  function checkFavorite(idRecipe) {
    const favoritesList = localStorage.getItem('favoriteRecipes');
    if (favoritesList && favoritesList.length > 0) {
      const checking = JSON.parse(favoritesList).some(
        (favoritedRecipe) => favoritedRecipe.id === idRecipe,
      );
      setFavorite(checking);
    }
  }

  const ContextProvider = { useSetInProgress,
    checkFavorite,
    checkProgress,
    recipeDone,
    enableFinishButton,
    email,
    favorite,
    favoriting,
    fetchResult,
    filters,
    ingredients,
    inputSearch,
    linkCopied,
    loginEnabled,
    password,
    recipeDetails,
    redirect,
    setEmail,
    setFavorite,
    setFetchResult,
    setFilters,
    setIngredients,
    setInputSearch,
    setLinkCopied,
    setPassword,
    setRecipeDetails,
    setRedirect,
    getIngredients,
    actualFilter,
    setActualFilter,
  };

  return (
    <RecipesContext.Provider value={ ContextProvider }>
      {children}
    </RecipesContext.Provider>
  );
}

RecipesProvider.propTypes = {
  children: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default RecipesProvider;
