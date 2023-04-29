/**
 * Shuffle an array
 * @param listToShuffle e.g ['a','b','c']
 * @returns 
 */
export const shuffle = (listToShuffle: string[]): string[] => {
  if (listToShuffle.length === 0) {
    return [];
  }
  const shuffledList: string[] = [];
  const listCopy: string[] = [...listToShuffle];

  while (listCopy.length) {
    const randomIndex = Math.floor(Math.random() * listCopy.length);
    const shuffledItem = listCopy.splice(randomIndex, 1)[0];
    shuffledList.push(shuffledItem);
  }

  return shuffledList;
};

/** @url https://vitejs.dev/guide/assets.html#new-url-url-import-meta-url */
export const getImgUrl = (name: string) : string => {
  const path = new URL(`../../`, import.meta.url)
  return `${path}assets/hiragana/${name}.png`
}