import React from 'react';
import ExploreBtnsSection from '../components/ExploreBtnsSection';
import Footer from '../components/Footer';
import Header from '../components/Header';

export default function ExploreDrinks() {
  return (
    <>
      <Header title="Explore Drinks" />
      <ExploreBtnsSection type="drinks" />
      <Footer page="explore" />
    </>
  );
}
