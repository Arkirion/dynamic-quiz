/**
 * Shuffle an array
 * @param listToShuffle e.g ['a','b','c']
 * @returns 
 */
export const shuffle = <T>(listToShuffle: Array<T>): Array<T> => {
  if (listToShuffle.length === 0) {
    return [];
  }
  const shuffledList: Array<T> = [];
  const listCopy: Array<T> = [...listToShuffle];

  while (listCopy.length) {
    const randomIndex = Math.floor(Math.random() * listCopy.length);
    const shuffledItem = listCopy.splice(randomIndex, 1)[0];
    shuffledList.push(shuffledItem);
  }

  return shuffledList;
};

/** @url https://vitejs.dev/guide/assets.html#new-url-url-import-meta-url */
export const getImgUrl = (path: string) : string => {
  const basePath = new URL(`../../assets`, import.meta.url)
  return `${basePath}/hiragana/${path}.png`
}