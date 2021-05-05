import { shuffle } from "./words";

const containsLetters = (
  word: string,
  letters: string[],
  regex: RegExp
): boolean => {
  return !!word.match(regex) && word.indexOf(letters[0]) >= 0;
};

type WordResponse = {
  letters: string[];
  availableWords: string[];
};

const getAvailableWordsFromLetters = async (
  allWords: Promise<string[]>,
  letters: string[]
): Promise<string[]> => {
  const regex = RegExp(`^[${letters.join("")}]+$`);
  return (await allWords).filter((w) => containsLetters(w, letters, regex));
};

const getLettersFromLocationHash = async (
  allWords: Promise<string[]>
): Promise<WordResponse | false> => {
  const hash = window.location.hash.slice(1);
  if (hash) {
    try {
      const letters = atob(hash).split("");
      if (letters.length === 7) {
        return {
          letters: [letters[0]].concat(...shuffle(letters.slice(1))),
          availableWords: await getAvailableWordsFromLetters(allWords, letters),
        };
      }
    } catch (e) {
      console.error(e);
    }
  }
  return false;
};

const getAllWords = async (): Promise<string[]> => {
  return fetch("./wordlist.txt").then(async (response) => {
    return (await response.text()).split("\n");
  });
};

const getNewLetters = async (
  allWords: Promise<string[]>
): Promise<WordResponse> => {
  return fetch("./seedwords.txt").then(async (response) => {
    const words = (await response.text()).split("\n");
    const seed = words[Math.floor(Math.random() * words.length)];

    const letters = shuffle(
      seed.split("").filter((a, i, arr) => arr.indexOf(a) === i)
    );
    const availableWords = await getAvailableWordsFromLetters(
      allWords,
      letters
    );

    return {
      letters,
      availableWords,
    };
  });
};

export { getNewLetters, getAllWords, getLettersFromLocationHash };
