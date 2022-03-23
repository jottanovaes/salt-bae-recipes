import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import setTokens from '../data/token';
import RecipesContext from '../Context/context';
import {
  SectionContainer,
  Input,
  LoginBtn,
  Title,
  LoginContainer,
  TitleContainer,
  InputContainer } from './style';

export default function Login({ history }) {
  const {
    email,
    password,
    setEmail,
    setPassword,
    loginEnabled,
  } = useContext(RecipesContext);

  return (
    <SectionContainer>
      <LoginContainer>
        <TitleContainer>
          <Title>SALT BAE</Title>
          <Title>RECIPES</Title>
        </TitleContainer>
        <InputContainer>
          <Input
            type="email"
            placeholder="Email"
            data-testid="email-input"
            value={ email }
            onChange={ (e) => setEmail(e.target.value) }
          />
          <Input
            type="password"
            placeholder="Password"
            data-testid="password-input"
            value={ password }
            onChange={ (e) => setPassword(e.target.value) }
          />
        </InputContainer>
        <LoginBtn
          type="button"
          data-testid="login-submit-btn"
          disabled={ loginEnabled }
          onClick={ () => setTokens(email, history) }
        >
          ENTER
        </LoginBtn>
      </LoginContainer>
    </SectionContainer>
  );
}

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};
