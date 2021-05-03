import { h, Fragment } from "preact";
import { useState, useEffect } from "preact/hooks";

import Letters from "./letters";
import LettersInput from "./lettersInput";
import WordList from "./wordList";
import Loading from "./loading";
import Progress from "./progress";

const shuffle = (arr: string[]) => {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
};

const App = () => {
  const [loading, setLoading] = useState(true);
  const [words, setWords] = useState<string[]>([]);
  const [letters, setLetters] = useState<string[]>([]);
  const [foundWords, setFoundWords] = useState<string[]>([]);

  const submitWord = (word: string) => {
    if (
      word.includes(letters[0]) &&
      words.includes(word) &&
      !foundWords.includes(word)
    ) {
      setFoundWords(foundWords.concat(word).sort());
    }
  };

  useEffect(() => {
    const allWords = fetch("./wordlist.txt").then(async (response) => {
      return (await response.text()).split("\n");
    });
    const seeds = fetch("./seedwords.txt").then(async (response) => {
      const words = (await response.text()).split("\n");
      const seed = words[Math.floor(Math.random() * words.length)];

      const letters = shuffle(
        seed.split("").filter((a, i, arr) => arr.indexOf(a) === i)
      );

      setLetters(letters);

      const regex = RegExp(`^[${letters.join("")}]+$`);
      const availableWords = (await allWords).filter((w) => w.match(regex));

      setWords(availableWords);

      return true;
    });

    seeds.then(() => setLoading(false));
  }, []);

  const onShuffle = () => {
    const firstLetter = letters[0];
    const rest = letters.slice(1);

    setLetters([firstLetter].concat(...shuffle(rest)));
  };

  return (
    <div id="app">
      <nav>
        <h1>Spelling Circle</h1>
      </nav>
      <main>
        {loading ? (
          <Loading />
        ) : (
          <Fragment>
            <section>
              <Letters
                letters={letters}
                submitWord={submitWord}
                onShuffle={onShuffle}
              />
            </section>
            <section>
              <Progress availableWords={words} foundWords={foundWords} />
              <WordList words={foundWords} />{" "}
            </section>
          </Fragment>
        )}
      </main>
    </div>
  );
};

export default App;
