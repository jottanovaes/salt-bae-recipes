import All from './assets/icons/All.svg';
import Beef from './assets/icons/Meat.svg';
import Breakfast from './assets/icons/Breakfast.svg';
import Chicken from './assets/icons/Chicken.svg';
import Dessert from './assets/icons/Dessert.svg';
import Goat from './assets/icons/Lamb.svg';
import Cocktail from './assets/icons/Cocktail.svg';
import Shake from './assets/icons/Shake.svg';
import Cocoa from './assets/icons/Cocoa.svg';
import Other from './assets/icons/Other_Unknown.svg';
import Ordinary from './assets/icons/Ordinary_Drink.svg';

export const icons = {
  All,
  Beef,
  Breakfast,
  Chicken,
  Dessert,
  Goat,
  Cocktail,
  Shake,
  Cocoa,
  Other_Unknown: Other,
  Ordinary_Drink: Ordinary,
};

export const VALID_EMAIL = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
export const MIN_PASSWORD_LENGTH = 6;
export const LINK_COPIED_TIMEOUT = 1000;
export const CARROUSEL_LENGTH = 6;
export const keysByType = (type) => (type === 'drinks'
  ? {
    type: 'drinks',
    localKey: 'cocktails',
    id: 'idDrink',
    name: 'strDrink',
    image: 'strDrinkThumb',
    alcoholicOrNot: 'Alcoholic',
  }
  : {
    type: 'foods',
    localKey: 'meals',
    id: 'idMeal',
    name: 'strMeal',
    image: 'strMealThumb',
    alcoholicOrNot: '',
  });
export const FAV_OBJ = (idRecipe, recipeDetails, type) => ({
  id: idRecipe,
  type: keysByType(type).type,
  nationality: type === 'meals' ? recipeDetails[0].strArea : '',
  category: recipeDetails[0].strCategory,
  alcoholicOrNot: keysByType(type).alcoholicOrNot,
  name: recipeDetails[0][keysByType(type).name],
  image: recipeDetails[0][keysByType(type).image],
});
export const MIN_WIDTH_CATEGORIES = 720;
