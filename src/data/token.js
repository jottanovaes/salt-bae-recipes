const setTokens = (email, history) => {
  localStorage.setItem('mealsToken', '1');
  localStorage.setItem('cocktailsToken', '1');
  localStorage.setItem('user', JSON.stringify({ email }));
  history.push('/foods');
};

export default setTokens;
