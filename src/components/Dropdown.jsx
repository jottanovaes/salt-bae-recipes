import React, { useState, useEffect, useContext } from 'react';
import RecipesContext from '../Context/context';
import {
  fetchAllMeals,
  fetchByNationality,
  fetchNationalitiesOptions,
} from '../services/search';

export default function Dropdown() {
  const [selected, setSelected] = useState('all');
  const [optionsList, setOptionsList] = useState([]);
  const { setFetchResult } = useContext(RecipesContext);
  // const MAX_OPTIONS = 13;

  // A depender do contexto, pode colocar para dar o fetch das opções
  // em fetchLoad e alterar apenas o array local;
  // Se for alterar o array, posso chamar o fetchLoad

  useEffect(() => {
    fetchNationalitiesOptions(setOptionsList);
  }, []);

  useEffect(() => {
    if (selected === 'all') {
      fetchAllMeals(setFetchResult);
    } else {
      fetchByNationality(selected, setFetchResult);
    }
  }, [selected, setFetchResult]);

  const renderSelect = () => {
    const options = optionsList.map((option, index) => (
      <option
        key={ `${index}-${option.strArea}` }
        data-testid={ `${option.strArea}-option` }
        value={ option.strArea }
        name="nationality"
      >
        { option.strArea }
      </option>
    ));

    return (
      <select
        data-testid="explore-by-nationality-dropdown"
        value={ selected }
        onChange={ (e) => {
          setSelected(e.target.value);
        } }
      >
        <option
          data-testid="All-option"
          name="nationality"
          value="all"
        >
          All
        </option>
        { options }
      </select>
    );
  };

  return (optionsList.length > 0 && renderSelect());
}
