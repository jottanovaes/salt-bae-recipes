import React, { useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
import RecipesContext from '../Context/context';
import { fetchSearch } from '../services/search';
import {
  Input,
  Form,
  StyledLbl,
  StyledRadio,
  StyledRadioSection,
  SearchBtn,
} from './style';

function SearchBar() {
  const [radioValue, setRadioValue] = useState('');
  const {
    inputSearch,
    setInputSearch,
    setFetchResult,
    setRedirect } = useContext(RecipesContext);

  const history = useHistory();
  const { pathname } = history.location;

  const drinkOrFood = pathname.split('/')[1];
  return (
    <Form>
      <Input
        type="text"
        data-testid="search-input"
        value={ inputSearch }
        placeholder="Search"
        searchBar
        onChange={ (e) => setInputSearch(e.target.value) }
      />
      <StyledRadioSection>
        <StyledLbl htmlFor="ingredients-search">
          <StyledRadio
            name="search"
            id="ingredients-search"
            type="radio"
            value="ingredient"
            data-testid="ingredient-search-radio"
            onChange={ (e) => setRadioValue(e.target.value) }
          />
          Ingredient
        </StyledLbl>
        <StyledLbl htmlFor="name-search">
          <StyledRadio
            name="search"
            id="name-search"
            type="radio"
            value="name"
            data-testid="name-search-radio"
            onChange={ (e) => setRadioValue(e.target.value) }
          />
          Name
        </StyledLbl>
        <StyledLbl htmlFor="letter-search">
          <StyledRadio
            name="search"
            id="letter-search"
            type="radio"
            value="first-letter"
            data-testid="first-letter-search-radio"
            onChange={ (e) => setRadioValue(e.target.value) }
          />
          First Letter
        </StyledLbl>
      </StyledRadioSection>
      <SearchBtn
        name="button"
        type="button"
        data-testid="exec-search-btn"
        onClick={ () => fetchSearch({
          radioValue,
          inputSearch,
          setFetchResult,
          drinkOrFood,
          setRedirect,
        }) }
      >
        Busca
      </SearchBtn>
    </Form>
  );
}
export default SearchBar;
