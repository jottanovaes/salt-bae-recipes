import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import RecipesContext from '../Context/context';
import { fetchFilters, fetchLoad } from '../services/search';
import { Section, SectionBtn } from './style';

export default function Filters({ type }) {
  const {
    filters,
    setFetchResult,
    setFilters,
    setIngredients,
    actualFilter,
    setActualFilter } = useContext(RecipesContext);

  const FILTER_QTDY = 5;
  const filterKeys = Object.keys(filters);
  const { width } = window.screen;

  return (
    filterKeys.length > 0 && (
      <Section width={ width }>
        <SectionBtn
          type="button"
          selected={ actualFilter }
          name="All"
          data-testid="All-category-filter"
          onClick={ () => {
            fetchLoad(setFetchResult, setFilters, setIngredients);
            setActualFilter('All');
          } }
        >
          All

        </SectionBtn>
        {filters[type].slice(0, FILTER_QTDY).map((filter) => (
          <SectionBtn
            selected={ actualFilter }
            type="button"
            data-testid={ `${filter.strCategory}-category-filter` }
            key={ filter.strCategory }
            name={ filter.strCategory.replace(' ', '_').replace('/', '_') }
            onClick={ () => {
              if (actualFilter === filter.strCategory) {
                fetchLoad(setFetchResult, setFilters, setIngredients);
                setActualFilter('All');
              } else {
                fetchFilters(filter.strCategory, type, setFetchResult);
                setActualFilter(filter.strCategory.replace(' ', '_').replace('/', '_'));
              }
            } }
          >
            {filter.strCategory.replace('/', ' ')}
          </SectionBtn>
        ))}
      </Section>
    )
  );
}

Filters.propTypes = {
  type: PropTypes.string.isRequired,
};
