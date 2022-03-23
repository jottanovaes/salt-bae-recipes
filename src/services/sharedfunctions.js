import { LINK_COPIED_TIMEOUT } from '../constants';

export async function shareButton(setLinkCopied) {
  setLinkCopied('Link copied!');
  navigator.clipboard.writeText(
    window.location.href.split('/in-progress')[0],
  );
  setTimeout(() => {
    setLinkCopied('');
  }, LINK_COPIED_TIMEOUT);
}

export function setFavoriteLocal(favoritesList, favObj, setFavorite) {
  if (favoritesList) {
    const parsedList = JSON.parse(favoritesList);
    localStorage.setItem(
      'favoriteRecipes',
      JSON.stringify([...parsedList, favObj]),
    );
    setFavorite(true);
  } else {
    localStorage.setItem('favoriteRecipes', JSON.stringify([favObj]));
    setFavorite(true);
  }
}
