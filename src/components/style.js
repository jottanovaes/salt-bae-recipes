/* eslint-disable max-lines */
import styled from 'styled-components';
import { icons, MIN_WIDTH_CATEGORIES } from '../constants';

export const StyledTitle = styled.h1`
  color: white;
  font-size: 2rem;
  font-family: 'Advent Pro', sans-serif;
  margin: 0;
  color: black;
  font-weight: bold;
`;

export const HeaderBtn = styled.button`
  background-color: transparent;
  border: none;
`;

export const StyledHeader = styled.header`
  padding-top: 10px;
  padding-bottom: 10px;
  align-items: center;
  width: 100vw;
  position: sticky;
  background-color: white;
  top: 0;
  text-align: center;
  padding: 0 2rem;
`;
export const StyledFotter = styled.footer`
  padding-top: 10px;
  padding-bottom: 10px;
  align-items: center;
  width: 100vw;
  position: sticky;
  bottom: 0;
  background-color: white;
`;

export const HeaderTitle = styled.div`
  display: flex;
  flex-direction: row;
  gap: 3rem;
  justify-content: space-evenly;
  background-color: white;
`;

export const StyledImg = styled.img`
  width: 30px;
  filter: ${(props) => props.page !== props.name && 'invert(0.5)'};
`;

export const Input = styled.input`
  background-color: white;
  border-radius: 4px;
  border: 0.1rem solid rgba(0, 0, 0, 0.33);
  font-family: 'Roboto', sans-serif;
  font-weight: normal;
  font-size: 1rem;
  height: ${(props) => (props.searchBar ? '38px' : '46px')};
  width: 85vw;
  padding-left: 0.5rem;

  &::placeholder {
    padding-left: ${(props) => (props.searchBar ? '0.5rem' : '1rem')};
  }

  &:focus {
    padding-left: 1rem;
  }
`;

export const Form = styled.form`
  margin-top: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const StyledLbl = styled.label`
  font-family: 'Advent Pro', sans-serif;
  color: #4d4d4d;
  font-size: 16px;
  font-weight: 600;
  letter-spacing: 0.01rem;
`;

export const StyledRadio = styled.input.attrs({
  type: 'radio',
})`
  margin-right: 6px;
  font-size: 16px;

  &:checked {
    accent-color: rgba(149, 32, 32, 0.8);
  }
`;

export const StyledRadioSection = styled.section`
  margin-top: 10px;
  display: flex;
  flex-direction: row;
  gap: 15px;
  width: 85vw;
  justify-content: space-evenly;
`;

export const SearchBtn = styled.button`
  border: none;
  width: 100px;
  height: 32px;
  border-radius: 8px;
  background-color: rgba(149, 32, 32, 0.7);
  color: white;
  font-family: 'Advent Pro', sans-serif;
  font-weight: bold;
  letter-spacing: 0.02rem;

  &:hover {
    background-color: rgba(149, 32, 32, 1);
  }
`;

export const SectionBtn = styled.button`
  align-items: center;
  border: 0.01rem solid #952020;
  background-color: ${
  (props) => (props.selected === props.name ? 'rgba(149, 32, 32, 0.7)' : 'transparent')};
  background-image: ${(props) => (`url(${icons[props.name]})`)};
  background-repeat: no-repeat;
  background-position: 0.5rem center;
  padding-left: 2.5rem;
  border-radius: 0.5rem;
  color: ${(props) => (props.selected === props
    .name ? 'white' : '#302E2E')};
  font-family: 'Advent Pro', sans-serif;
  font-weight: bold;
  letter-spacing: 0.02rem;
  padding-top: 0.25rem;
  padding-bottom: 0.25rem;
  white-space: nowrap;
`;

export const Section = styled.section`
  display: flex;
  gap: 0.5rem;
  flex-direction: row;
  overflow-x: scroll;
  justify-content: ${(props) => (props
    .width <= MIN_WIDTH_CATEGORIES ? 'flex-start' : 'center')};
  justify-items: center;
  padding: 0.5rem 1rem;
  width: 100%;

  &::-webkit-scrollbar {
    display: none;
  }
`;

export const Carousel = styled.div`
  &::-webkit-scrollbar {
    display: none;
  }
`;

export const StartBtn = styled.button`
  width: 10rem;
  margin: auto;
  border-style: none;
  border-radius: 1rem;
  margin: 1rem;
  background-color: ${(props) => (props.name !== 'Finish' ? '#2591ff' : '#952020')};
  color: white;
  font-family: 'Advent Pro', sans-serif;
  font-weight: 600;
  font-size: 1.25rem;
  letter-spacing: 0.02rem;
  &:disabled {
    background-color: #5c3131;
  }
`;

export const Contents = styled.div`
  padding-bottom: 0rem;
`;

export const ButtonContainer = styled.div`
  width: 100%;
  position: fixed;
  bottom: 0;
  display: flex;
  justify-content: center;
`;

export const RecipeList = styled.div`
  padding-top: 1rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  background-color: #fffafa;
  padding-bottom: 5rem;
`;

export const Recipe = styled.div`
  width: 90%;
  margin: auto;
  display: flex;
  flex-direction: row;
  align-items: center;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0px 6px 16px -14px black;
`;

export const RecipeInfo = styled.section`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  padding: 0.5rem 0;
  margin-left: 1rem;
`;

export const RecipeName = styled.p`
  font-family: 'Advent Pro', sans-serif;
  font-weight: bold;
  font-size: 1rem;
  margin: 0;
  text-decoration: none;
  font-size: 20px;
  color: black;
  font-weight: 700;
`;

export const RecipeCategory = styled.p`
  font-family: 'Advent Pro', sans-serif;
  font-weight: bold;
  text-decoration: none;
  margin: 0;
  font-size: 16px;
  color: gray;
`;

export const RecipeImg = styled.img`
  margin: 0.5rem;
  min-width: 5rem;
  border-radius: 8px ;
`;

export const Button = styled.button`
  background-color: white;
  border-style: none;
  width: 100%;
  display: flex;
  align-items: center;
`;

export const BackButton = styled.button`
  background-color: transparent;
  border-style: none;
  position: fixed;
  top: 1rem;
  left: 1rem;
`;

export const ButtonsContainer = styled.div`
  display: flex;
  justify-content: center;
`;

export const ThumbContainer = styled.div`
  position: fixed;
  top: 0;
  width: 100vw;
  display: flex;
  justify-content: center;
  z-index: -1;
  &::before {
    content: '';
    position: absolute;
    top: 0; left: 0;
    width: 100%; height: 100%;
    background-image: ${(props) => (`url(${props.src})`)};
    background-size: cover;
    background-position: center;
    z-index: -1;
    filter: blur(0.2rem);
  }
`;

export const DetailsContainer = styled.div`
  background-color: white;
  position: relative;
  overflow-y: scroll;
  top: 30vh;
  border-radius: 1.5rem;
  font-family: 'Advent Pro', sans-serif;
  font-weight: bold;
  padding: 1.5rem;
  margin-bottom: 15rem;
`;

export const Thumb = styled.img`
  height: 30vh;
`;

export const Title = styled.h4`
  font-weight: bold;
`;

export const Category = styled.h6`
  font-weight: bold;
  color: #949494;
`;

export const DetailsTitle = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding-bottom: 0;
`;

export const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

export const IngredientItem = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  text-decoration-line: ${(props) => (props.line && 'line-through')};
  text-decoration-color: black;
  color: #949494; 
`;

export const CarouselCard = styled.div`
  box-shadow: 0px 4px 5px -3px black;
  padding: 0;
  display: flex;
  flex-direction: column;
  /* padding-bottom: 1rem; */
  margin: 0.5rem;
  border-radius: 0.5rem;
  width: 6rem;
`;

export const ImgCarousel = styled.img`
  border-radius: 0.5rem 0.5rem 0 0;
  margin: 0;
  padding: 0;
  top: 0;
  width: 100%;
`;

export const SelectNationality = styled.select`
  width: 75%;
  height: 3rem;
  background-color: white;
  border-radius: 4px;
  border: 0.1rem solid rgba(0, 0, 0, 0.33);
  padding: 0.5rem;
  color: #4d4d4d;
`;

export const SelectContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.5rem;
`;
