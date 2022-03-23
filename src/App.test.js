import renderPath from './services/renderPath';
import userEvent from '@testing-library/user-event';
import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';


const VALID_EMAIL = 'alguem@email.com';
const VALID_PASSWORD = '1234567';
const INVALID_EMAIL = 'email';
const INVALID_PASSWORD = '23456';

afterEach(() => jest.clearAllMocks());

describe('Tela de Login:', () => {
  it('Tem os data-testids email-input, password-input e login-submit-btn', () => {
    render(<App />);

    const email = screen.getByTestId('email-input');
    const password = screen.getByTestId('password-input');
    const loginButton = screen.getByTestId('login-submit-btn');

    expect(email).toBeInTheDocument();
    expect(password).toBeInTheDocument();
    expect(loginButton).toBeInTheDocument();
  });
  it('É possível escrever o email', () => {
    render(<App />);
    const email = screen.getByTestId('email-input');

    expect(email).toBeInTheDocument();
    userEvent.type(email, 'some@value.com');
    expect(email).toHaveValue('some@value.com');
  });
  it('É possível escrever a senha', () => {
    // renderWithRouter(<App />)
    render(<App />);
    const password = screen.getByTestId('password-input');

    expect(password).toBeInTheDocument();
    userEvent.type(password, '1234567');
    expect(password).toHaveValue('1234567');
  });
  it('O botão deve estar desativado se o email for inválido', () => {
    render(<App />);
    const email = screen.getByTestId('email-input');
    const password = screen.getByTestId('password-input');
    const loginButton = screen.getByTestId('login-submit-btn');

    userEvent.type(email, INVALID_EMAIL);
    userEvent.type(password, VALID_PASSWORD);
    expect(loginButton).toBeDisabled();

    userEvent.type(email, VALID_EMAIL);
    userEvent.type(password, INVALID_PASSWORD);
    expect(loginButton).toBeDisabled();

    userEvent.type(email, INVALID_EMAIL);
    userEvent.type(password, INVALID_PASSWORD);
    expect(loginButton).toBeDisabled();

    userEvent.type(email, VALID_EMAIL);
    userEvent.type(password, VALID_PASSWORD);
    expect(loginButton).toBeEnabled();
  });
  it('Após a submissão mealsToken e cocktailsToken devem estar salvos em localStorage', () => {
    render(<App />);
    const email = screen.getByTestId('email-input');
    const password = screen.getByTestId('password-input');
    const loginButton = screen.getByTestId('login-submit-btn');

    userEvent.type(email, VALID_EMAIL);
    userEvent.type(password, VALID_PASSWORD);
    expect(loginButton).toBeEnabled();

    userEvent.click(loginButton);

    const localStorage1 = JSON.parse(localStorage.getItem('mealsToken'));
    const localStorage2 = JSON.parse(localStorage.getItem('cocktailsToken'));

    expect(localStorage1).toBe(1);
    expect(localStorage2).toBe(1);
  });

  it('Após a submissão a chave user deve estar salva em localStorage', () => {
    renderPath('/');
    const email = screen.getByTestId('email-input');
    const password = screen.getByTestId('password-input');
    const loginButton = screen.getByTestId('login-submit-btn');

    userEvent.type(email, VALID_EMAIL);
    userEvent.type(password, VALID_PASSWORD);
    expect(loginButton).toBeEnabled();

    userEvent.click(loginButton);

    const { email: localStorageEmail } = JSON.parse(
      localStorage.getItem('user')
    );

    expect(localStorageEmail).toBe(VALID_EMAIL);

  });
});

describe('Header', () => {
  it('09 - Tem os data-testids `profile-top-btn`, `page-title` e `search-top-btn`',
  () => {
    renderPath('/foods');
    const profileBtn = screen.getByTestId('profile-top-btn');
    const pageTitle = screen.getByTestId('page-title');
    const searchBtn = screen.getByTestId('search-top-btn');
    expect(profileBtn).toBeInTheDocument();
    expect(pageTitle).toBeInTheDocument();
    expect(searchBtn).toBeInTheDocument();
  });

  describe('10 - Verifica a presença Header nas Pages', () => {
    it('Não há header na tela de Login',
    () => {
      renderPath('/');
      const pageTitle = screen.queryByTestId('page-title');
      expect(pageTitle).not.toBeInTheDocument();
    });

    it('Não há header na tela de Recipe (food)',
    () => {
      renderPath('/foods/:id');
      const pageTitle = screen.queryByTestId('page-title');
      expect(pageTitle).not.toBeInTheDocument();
    });

    it('Não há header na tela de Recipe (drink)',
    () => {
      renderPath('/drinks/:id');
      const pageTitle = screen.queryByTestId('page-title');
      expect(pageTitle).not.toBeInTheDocument();
    });

    it('Não há header na tela de Progress (food)',
    () => {
      renderPath('/foods/:id/in-progress');
      const pageTitle = screen.queryByTestId('page-title');
      expect(pageTitle).not.toBeInTheDocument();
    });

    it('Não há header na tela de Progress (drink)',
    () => {
      renderPath('/drinks/:id/in-progress');
      const pageTitle = screen.queryByTestId('page-title');
      expect(pageTitle).not.toBeInTheDocument();
    });

    it('O header tem os ícones corretos na tela de Foods',
    () => {
      renderPath('/foods');
      const profileBtn = screen.getByTestId('profile-top-btn');
      const pageTitle = screen.getByTestId('page-title');
      const searchBtn = screen.queryByTestId('search-top-btn');
      expect(profileBtn).toBeInTheDocument();
      expect(searchBtn).toBeInTheDocument();
      expect(pageTitle).toHaveTextContent(/Foods/i);
    });

    it('O header tem os ícones corretos na tela de Drinks',
    () => {
      renderPath('/drinks');
      const profileBtn = screen.getByTestId('profile-top-btn');
      const pageTitle = screen.getByTestId('page-title');
      const searchBtn = screen.queryByTestId('search-top-btn');
      expect(profileBtn).toBeInTheDocument();
      expect(searchBtn).toBeInTheDocument();
      expect(pageTitle).toHaveTextContent(/Drinks/i);
    });

    it('O header tem os ícones corretos na tela de Explore Foods',
    () => {
      renderPath('/explore/foods');
      const profileBtn = screen.getByTestId('profile-top-btn');
      const pageTitle = screen.getByTestId('page-title');
      const searchBtn = screen.queryByTestId('search-top-btn');
      expect(profileBtn).toBeInTheDocument();
      expect(searchBtn).not.toBeInTheDocument();
      expect(pageTitle).toHaveTextContent(/Explore Foods/i);
    });

    it('O header tem os ícones corretos na tela de Explore Drinks',
    () => {
      renderPath('/explore/drinks');
      const profileBtn = screen.getByTestId('profile-top-btn');
      const pageTitle = screen.getByTestId('page-title');
      const searchBtn = screen.queryByTestId('search-top-btn');
      expect(profileBtn).toBeInTheDocument();
      expect(searchBtn).not.toBeInTheDocument();
      expect(pageTitle).toHaveTextContent(/Explore Drinks/i);
    });

    it('O header tem os ícones corretos na tela de Drinks Ingredients',
    () => {
      renderPath('/explore/drinks/ingredients');
      const profileBtn = screen.getByTestId('profile-top-btn');
      const pageTitle = screen.getByTestId('page-title');
      const searchBtn = screen.queryByTestId('search-top-btn');
      expect(profileBtn).toBeInTheDocument();
      expect(searchBtn).not.toBeInTheDocument();
      expect(pageTitle).toHaveTextContent(/Explore Ingredients/i);
    });

    it('O header tem os ícones corretos na tela de Foods Ingredients',
    () => {
      renderPath('/explore/foods/ingredients');
      const profileBtn = screen.getByTestId('profile-top-btn');
      const pageTitle = screen.getByTestId('page-title');
      const searchBtn = screen.queryByTestId('search-top-btn');
      expect(profileBtn).toBeInTheDocument();
      expect(searchBtn).not.toBeInTheDocument();
      expect(pageTitle).toHaveTextContent(/Explore Ingredients/i);
    });

    it('O header tem os ícones corretos na tela de Nationalities',
    () => {
      renderPath('/explore/foods/nationalities');
      const profileBtn = screen.getByTestId('profile-top-btn');
      const pageTitle = screen.getByTestId('page-title');
      const searchBtn = screen.queryByTestId('search-top-btn');
      expect(profileBtn).toBeInTheDocument();
      expect(searchBtn).toBeInTheDocument();
      expect(pageTitle).toHaveTextContent(/Explore Nationalities/i);
    });

    it('O header tem os ícones corretos na tela de Profile',
    () => {
      renderPath('/profile');
      const profileBtn = screen.getByTestId('profile-top-btn');
      const pageTitle = screen.getByTestId('page-title');
      const searchBtn = screen.queryByTestId('search-top-btn');
      expect(profileBtn).toBeInTheDocument();
      expect(searchBtn).not.toBeInTheDocument();
      expect(pageTitle).toHaveTextContent(/Profile/i);
    });

    it('O header tem os ícones corretos na tela de Done Recipes',
    () => {
      renderPath('/done-recipes');
      const profileBtn = screen.getByTestId('profile-top-btn');
      const pageTitle = screen.getByTestId('page-title');
      const searchBtn = screen.queryByTestId('search-top-btn');
      expect(profileBtn).toBeInTheDocument();
      expect(searchBtn).not.toBeInTheDocument();
      expect(pageTitle).toHaveTextContent(/Done Recipes/i);
    });

    it('O header tem os ícones corretos na tela de Favorite Recipes',
    () => {
      renderPath('/favorite-recipes');
      const profileBtn = screen.getByTestId('profile-top-btn');
      const pageTitle = screen.getByTestId('page-title');
      const searchBtn = screen.queryByTestId('search-top-btn');
      expect(profileBtn).toBeInTheDocument();
      expect(searchBtn).not.toBeInTheDocument();
      expect(pageTitle).toHaveTextContent(/Favorite Recipes/i);
    });
  });

  it('11 - Verifica se redireciona para a page Profile ao clicar no ícone', () => {
    renderPath('/foods');
    const profileBtn = screen.getByTestId('profile-top-btn');
    expect(screen.getByTestId('page-title')).toHaveTextContent(/Foods/i);
    expect(profileBtn).toBeInTheDocument();
    userEvent.click(profileBtn);
    expect(screen.getByTestId('page-title')).toHaveTextContent(/Profile/i);
  });

  it('12 - Verifica se mostra ou esconde a barra de pesquisa ao clicar o ícone de pesquisar', () => {
    renderPath('/foods');
    const searchBtn = screen.getByTestId('search-top-btn');
    expect(searchBtn).toBeInTheDocument();
    userEvent.click(searchBtn);
    const searchInput = screen.getByTestId('search-input');
    expect(searchInput).toBeInTheDocument();
    userEvent.click(searchBtn);
    expect(searchInput).not.toBeInTheDocument();
  });
});
