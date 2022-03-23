import styled from 'styled-components';
import loginImage from '../assets/recipe-background.jpg';

export const LoginContainer = styled.div`
  justify-content: center;
  align-items: center;
  display: flex;
  flex-direction: column;
  background-color:rgba(46, 46, 46, 0.5);
  padding: 0.5rem;
  width: 19rem;
  margin: auto;
  margin-bottom: 15vh;
  backdrop-filter: blur(0.15rem);
  border-radius: 1rem;
  border:  0.1rem solid rgba(255, 255, 255, 0.2);
`;

export const TitleContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 1rem;
`;

export const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

export const Input = styled.input`
  background-color: white;
  border-radius: 4px;
  border-style: none;
  box-shadow: none;
  font-family: 'Roboto', sans-serif;
  font-weight: normal;
  font-size: 1rem;
  height: ${(props) => (props.searchBar ? '38px' : '46px')};
  width: 221px;
  padding-left: 0.5rem;

  &::placeholder {
    padding-left:  ${(props) => (props.searchBar ? '0.5rem' : '1rem')};
    font-family: 'Roboto', sans-serif;
    font-weight: normal;
  }

  &:focus {
    border-style: none;
    color: #2a2a2a;
    font-family: 'Roboto', sans-serif;
    font-weight: normal;
    padding-left: 1rem;
  }
`;

export const LoginBtn = styled.button`
  background-color: #c53f3f;
  border-radius: 4px;
  border: none;
  color: white;
  font-family: 'Advent Pro', sans-serif;
  font-size: 1.3rem;
  font-weight: bold;
  height: 46px;
  letter-spacing: 0.1rem;
  width: 221px;
  margin: 1rem;

  &:disabled {
    background-color: #5c3131;
  }
`;

export const SectionContainer = styled.div`
  width: 100vw;
  height: 100vh;
  background-image: url(${loginImage});
  background-size: cover;
  background-position: center;
  display: flex;
`;

export const Title = styled.h1`
  color: white;
  font-family: 'Advent Pro', sans-serif;
  font-weight: bold;
  line-height: 2.5rem;
  margin: 0;
  text-shadow: 0.1rem 0.2rem 0.1rem rgba(0, 0, 0, 0.25),
  -0.1rem 0.2rem 0.1rem rgba(0, 0, 0, 0.25);
`;
