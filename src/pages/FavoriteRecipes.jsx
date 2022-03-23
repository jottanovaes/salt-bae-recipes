import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import RecipesContext from '../Context/context';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import shareIcon from '../images/shareIcon.svg';

export default function FavoriteRecipes() {
  const { linkCopied, setLinkCopied } = useContext(RecipesContext);
  const [favoriteList, setFavoriteList] = useState([]);
  const parsedFavorites = JSON.parse(localStorage.getItem('favoriteRecipes'));
  const LINK_COPIED_TIMEOUT = 2000;

  function removeFavorite(id) {
    if (parsedFavorites) {
      const newFavorites = parsedFavorites.filter(
        (favorite) => favorite.id !== id,
      );
      localStorage.setItem('favoriteRecipes', JSON.stringify(newFavorites));
      setFavoriteList(newFavorites);
    }
  }

  function shareButton(id, type) {
    const url = window.location.href.split('/')[2];
    setLinkCopied('Link copied!');
    navigator.clipboard.writeText(`http://${url}/${type}s/${id}`);
    setTimeout(() => {
      setLinkCopied('');
    }, LINK_COPIED_TIMEOUT);
  }

  function emptyFilter() {
    setFavoriteList(parsedFavorites);
  }

  function filteringFavorites(type) {
    const filtered = parsedFavorites.filter(
      (favorite) => favorite.type === type,
    );
    setFavoriteList(filtered);
  }

  useEffect(() => {
    if (parsedFavorites) {
      setFavoriteList(parsedFavorites);
    }
  }, []);

  return (
    <>
      <Header title="Favorite Recipes" />
      <button
        type="button"
        data-testid="filter-by-all-btn"
        onClick={ () => emptyFilter() }
      >
        All
      </button>
      <button
        type="button"
        data-testid="filter-by-food-btn"
        onClick={ () => filteringFavorites('food') }
      >
        Foods
      </button>
      <button
        type="button"
        data-testid="filter-by-drink-btn"
        onClick={ () => filteringFavorites('drink') }
      >
        Drinks
      </button>
      {favoriteList
        && favoriteList.map((recipe, index) => (
          <>
            <Link to={ `/${recipe.type}s/${recipe.id}` }>
              <h4 data-testid={ `${index}-horizontal-name` }>{recipe.name}</h4>
              <img
                data-testid={ `${index}-horizontal-image` }
                src={ recipe.image }
                alt={ recipe.name }
                style={ { width: '30vh' } }
              />
            </Link>
            <h5 data-testid={ `${index}-horizontal-top-text` }>
              {recipe.alcoholicOrNot
                ? recipe.alcoholicOrNot
                : `${recipe.nationality} - ${recipe.category}`}
            </h5>

            <button
              type="button"
              onClick={ () => removeFavorite(recipe.id) }
            >
              <img
                data-testid={ `${index}-horizontal-favorite-btn` }
                src={ blackHeartIcon }
                alt={ recipe.id }
              />
            </button>
            <button
              type="button"
              onClick={ () => shareButton(recipe.id, recipe.type) }
            >
              <img
                data-testid={ `${index}-horizontal-share-btn` }
                src={ shareIcon }
                alt={ recipe.name }
              />
              {linkCopied}
            </button>
          </>
        ))}
    </>
  );
}

// pegar do localStorage a chave favoriteRecipes
// colocar num estado a lista de favoritos
// botão de desfavoritar deve tirar da lista de favoritos
// e com o didUpdate seta um novo localStorage baseado na lista
