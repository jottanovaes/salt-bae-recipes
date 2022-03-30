import React from 'react';
import { useHistory } from 'react-router';
import Footer from '../components/Footer';
import Header from '../components/Header';
import { StartBtn } from '../components/style';
import { ExplorerContainer } from './style';

export default function Explore() {
  const history = useHistory();

  return (
    <>
      <Header title="Explore" />
      <ExplorerContainer>
        <StartBtn
          type="button"
          data-testid="explore-foods"
          onClick={ () => history.push('/explore/foods') }
        >
          Explore Foods
        </StartBtn>
        <StartBtn
          type="button"
          data-testid="explore-drinks"
          onClick={ () => history.push('/explore/drinks') }
        >
          Explore Drinks
        </StartBtn>
      </ExplorerContainer>
      <Footer page="explore" />
    </>
  );
}
