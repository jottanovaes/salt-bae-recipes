import React from 'react';
import Dropdown from '../components/Dropdown';
import Footer from '../components/Footer';
import Header from '../components/Header';
import Recipes from '../components/Recipes';

export default function Nationalities() {
  return (
    <>
      <Header title="Explore Nationalities" />
      <Dropdown />
      <Recipes type="meals" />
      <Footer page="other" />
    </>
  );
}
