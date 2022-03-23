import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';

import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';
import SearchBar from './SearchBar';
import {
  StyledHeader,
  HeaderBtn,
  HeaderTitle,
  StyledImg,
  StyledTitle } from './style';

const pageTitles = ['Foods', 'Drinks', 'Explore Nationalities'];

export default function Header(props) {
  const { title } = props;
  const history = useHistory();
  const [isSearchInputEnabled, setIsSearchInputEnabled] = useState(false);

  function renderSearchBtn() {
    return (
      <HeaderBtn
        type="button"
        onClick={ () => setIsSearchInputEnabled((prevState) => !prevState) }
      >
        <StyledImg
          data-testid="search-top-btn"
          src={ searchIcon }
          alt="search"
        />
      </HeaderBtn>
    );
  }

  function renderSearchInput() {
    return (
      <SearchBar />
    );
  }

  return (
    <StyledHeader>
      <HeaderTitle>
        <HeaderBtn
          type="button"
          onClick={ () => history.push('/profile') }
        >
          <StyledImg
            data-testid="profile-top-btn"
            src={ profileIcon }
            alt="profile"
          />
        </HeaderBtn>
        <StyledTitle data-testid="page-title">{ title }</StyledTitle>
        { pageTitles.includes(title) && renderSearchBtn() }
      </HeaderTitle>
      { isSearchInputEnabled && renderSearchInput() }
    </StyledHeader>
  );
}

Header.propTypes = {
  title: PropTypes.string.isRequired,
};
