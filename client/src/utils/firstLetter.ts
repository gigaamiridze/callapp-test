export const enlargeFirstLetter = (word: string) => {
  const firstLetter = word.charAt(0).toUpperCase(); // Convert the first character to uppercase
  const restOfWord = word.slice(1); // Get the rest of the word
  const enlargedWord = `${firstLetter}${restOfWord}`;
  return enlargedWord;
}