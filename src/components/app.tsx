import { h, Fragment } from "preact";
import { useState, useEffect } from "preact/hooks";

import Letters from "./letters";
import WordList from "./wordList";
import Loading from "./loading";
import Progress from "./progress";
import { shuffle } from "../utils/words";
import {
  getAllWords,
  getLettersFromLocationHash,
  getNewLetters,
} from "../utils/fetchers";

const App = () => {
  const [loading, setLoading] = useState(true);
  const [words, setWords] = useState<string[]>([]);
  const [letters, setLetters] = useState<string[]>([]);
  const [foundWords, setFoundWords] = useState<string[]>([]);
  const [revealed, setRevealed] = useState(false);

  const submitWord = (word: string) => {
    if (
      !revealed &&
      word.includes(letters[0]) &&
      words.includes(word) &&
      !foundWords.includes(word)
    ) {
      setFoundWords(foundWords.concat(word).sort());
    }
  };

  useEffect(() => {
    const allWords = getAllWords();

    getLettersFromLocationHash(allWords)
      .then((response) => {
        if (response) {
          return response;
        } else {
          return getNewLetters(allWords);
        }
      })
      .then((response) => {
        setWords(response.availableWords);
        setLetters(response.letters);
        window.location.hash = btoa(response.letters.join(""));
        setLoading(false);
      });
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
        <button
          onClick={() => {
            window.location.hash = "";
            window.location.reload();
          }}
        >
          Get new puzzle
        </button>
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
                disableInput={revealed}
              />
            </section>
            <section>
              <Progress availableWords={words} foundWords={foundWords} />
              <WordList
                foundWords={foundWords}
                availableWords={words}
                revealed={revealed}
                onReveal={() => setRevealed(true)}
              />{" "}
            </section>
          </Fragment>
        )}
      </main>
    </div>
  );
};

export default App;
