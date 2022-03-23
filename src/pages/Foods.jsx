import React, { useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import RecipesContext from '../Context/context';
import Recipes from '../components/Recipes';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Filters from '../components/Filters';
import { fetchLoad, fetchSearch } from '../services/search';

export default function Foods({ history }) {
  const {
    redirect,
    setFetchResult,
    setRedirect,
    setFilters,
    setIngredients } = useContext(RecipesContext);
  const { state: inputSearch } = history.location;

  useEffect(() => {
    if (inputSearch) {
      const radioValue = 'ingredient';
      const drinkOrFood = 'foods';
      fetchSearch({
        radioValue,
        inputSearch,
        setFetchResult,
        drinkOrFood,
        setRedirect,
      });
    } else {
      fetchLoad(setFetchResult, setFilters, setIngredients);
    }

    if (redirect.length === 1) {
      const route = `/foods/${redirect[0].meals[0].idMeal}`;
      setRedirect([]);
      history.push(route);
    }
  }, [
    history,
    inputSearch,
    setFetchResult,
    setFilters,
    setIngredients,
    redirect,
    setRedirect,
  ]);

  return (
    <>
      <Header title="Foods" />
      <Filters type="meals" />
      <Recipes type="meals" />
      <Footer page="meals" />
    </>
  );
}

Foods.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
    location: PropTypes.shape({
      state: PropTypes.string,
    }),
  }).isRequired,
};
