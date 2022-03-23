export async function fetchLoad(setFetchResult, setFilters, setIngredients) {
  const endpoints = [
    'https://www.themealdb.com/api/json/v1/1/search.php?s=',
    'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=',
    'https://www.themealdb.com/api/json/v1/1/list.php?c=list',
    'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list',
    'https://www.themealdb.com/api/json/v1/1/list.php?i=list',
    'https://www.thecocktaildb.com/api/json/v1/1/list.php?i=list',
  ];
  const resultFood = await (await fetch(endpoints[0])).json();
  const resultDrink = await (await fetch(endpoints[1])).json();
  const optionstFood = await (await fetch(endpoints[2])).json();
  const optionstDrink = await (await fetch(endpoints[3])).json();
  const foodIngredients = await (await fetch(endpoints[4])).json();
  const drinkIngredients = await (await fetch(endpoints[5])).json();

  setFetchResult({ ...resultFood, ...resultDrink });
  setFilters({ ...optionstFood, ...optionstDrink });
  setIngredients({ ...foodIngredients, ...drinkIngredients });
}

export async function fetchFilters(category, type, setFetchResult) {
  const endpoints = {
    drinks: `https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${category}`,
    meals: `https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`,
  };

  const categoryResult = await (await fetch(endpoints[type])).json();

  setFetchResult((prevState) => ({ ...prevState, ...categoryResult }));
}

const checkFetch = (setRedirect, result) => {
  const resultKeys = Object.keys(result);

  if (!result[resultKeys[0]]) {
    global.alert('Sorry, we haven\'t found any recipes for these filters.');
  } else if (result[resultKeys].length === 1) {
    setRedirect([result]);
  }
};

export async function fetchSearch({
  radioValue,
  inputSearch,
  setFetchResult,
  drinkOrFood,
  setRedirect,
}) {
  const endPoints = {
    foods: {
      ingredient: `https://www.themealdb.com/api/json/v1/1/filter.php?i=${inputSearch}`,
      name: `https://www.themealdb.com/api/json/v1/1/search.php?s=${inputSearch}`,
      firstLetter: `https://www.themealdb.com/api/json/v1/1/search.php?f=${inputSearch}`,
    },
    drinks: {
      ingredient: `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${inputSearch}`,
      name: `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${inputSearch}`,
      firstLetter: `https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${inputSearch}`,
    },
  };

  let result;

  switch (radioValue) {
  case 'ingredient':
    result = await (await fetch(endPoints[drinkOrFood].ingredient)).json();
    checkFetch(setRedirect, result);
    setFetchResult((prevState) => ({ ...prevState, ...result }));
    break;
  case 'name':
    result = await (await fetch(endPoints[drinkOrFood].name)).json();
    checkFetch(setRedirect, result);
    setFetchResult((prevState) => ({ ...prevState, ...result }));
    break;
  case 'first-letter':
    if (inputSearch.length > 1) {
      global.alert('Your search must have only 1 (one) character');
    } else {
      result = await (await fetch(endPoints[drinkOrFood].firstLetter)).json();
      checkFetch(setRedirect, result);
      setFetchResult((prevState) => ({ ...prevState, ...result }));
    }

    break;
  default:
    return {};
  }
}

export async function fetchById(idRecipe, recipeType, setRecipeDetails) {
  const endPoints = {
    meals: `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${idRecipe}`,
    drinks: `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${idRecipe}`,
  };
  const result = await (
    await fetch(endPoints[recipeType])).json();
  setRecipeDetails(result[recipeType]);
}

// Pages ExploreFoods e ExploreDrinks
export const fetchRandomRecipe = async (path, callback) => {
  const endpoints = [
    'https://www.themealdb.com/api/json/v1/1/random.php',
    'https://www.thecocktaildb.com/api/json/v1/1/random.php'];

  if (path === 'foods') {
    const { idMeal } = (await (await fetch(endpoints[0])).json()).meals[0];
    callback(idMeal);
  } else {
    const { idDrink } = (await (await fetch(endpoints[1])).json()).drinks[0];
    callback(idDrink);
  }
};

// Page Nationalities

export const fetchAllMeals = async (callback) => {
  const endpoint = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
  const { meals } = (await (await fetch(endpoint)).json());
  // console.log(meals);
  // setFetchResult
  callback((prevState) => ({ ...prevState, meals }));
};

export const fetchNationalitiesOptions = async (callback) => {
  const endpoint = 'https://www.themealdb.com/api/json/v1/1/list.php?a=list';
  const { meals } = (await (await fetch(endpoint)).json());
  // console.log(meals);
  // setOptionsList -> filtro
  callback(meals);
};

export const fetchByNationality = async (nationality, callback) => {
  const endpoint = `https://www.themealdb.com/api/json/v1/1/filter.php?a=${nationality}`;
  const { meals } = (await (await fetch(endpoint)).json());
  // console.log(meals);
  // callback = setFetchResult
  callback((prevState) => ({ ...prevState, meals }));
};

export default fetchSearch;
