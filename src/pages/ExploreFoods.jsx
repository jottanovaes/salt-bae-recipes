import React from 'react';
import ExploreBtnsSection from '../components/ExploreBtnsSection';
import Footer from '../components/Footer';
import Header from '../components/Header';

export default function ExploreFoods() {
  return (
    <>
      <Header title="Explore Foods" />
      <ExploreBtnsSection type="foods" />
      <Footer page="explore" />
    </>
  );
}
