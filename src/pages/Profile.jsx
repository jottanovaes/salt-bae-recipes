import React from 'react';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import Footer from '../components/Footer';
import Header from '../components/Header';

export default function Profile() {
  const storageEmail = JSON.parse(localStorage.getItem('user'));
  const history = useHistory();

  const logoutFunc = () => {
    localStorage.clear();
    history.push('/');
  };

  return (
    <>
      <Header title="Profile" />
      <p
        data-testid="profile-email"
      >
        { storageEmail && storageEmail.email }
      </p>
      <button
        data-testid="profile-done-btn"
        type="button"
        onClick={ () => history.push('/done-recipes') }
      >
        Done Recipes
      </button>
      <button
        data-testid="profile-favorite-btn"
        type="button"
        onClick={ () => history.push('/favorite-recipes') }
      >
        Favorite Recipes
      </button>
      <button
        data-testid="profile-logout-btn"
        type="button"
        onClick={ logoutFunc }
      >
        Logout
      </button>
      <Footer />
    </>
  );
}
