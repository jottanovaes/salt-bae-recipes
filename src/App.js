import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Routes from './routes';
import RecipesProvider from './Context/provider';

function App() {
  return (
    <RecipesProvider>
      <Routes />
    </RecipesProvider>
  );
}

export default App;
