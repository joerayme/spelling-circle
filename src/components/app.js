import { h } from "preact";
import { useState, useEffect } from "preact/hooks";

import Letters from "./letters";
import LettersInput from "./lettersInput";
import WordList from "./wordList";
import Loading from "./loading";

const App = () => {
  const [loading, setLoading] = useState(true);
  const [words, setWords] = useState([]);
  const [letters, setLetters] = useState([]);
  const [foundWords, setFoundWords] = useState([]);

  const submitWord = (word) => {
    if (
      word.includes(letters[0]) &&
      words.includes(word) &&
      !foundWords.includes(word)
    ) {
      setFoundWords(foundWords.concat(word).sort());
    }
  };

  useEffect(() => {
    const w = fetch("./wordlist.txt").then(async (response) => {
      setWords((await response.text()).split("\n"));
      return true;
    });
    const s = fetch("./seedwords.txt").then(async (response) => {
      const words = (await response.text()).split("\n");
      const seed = words[Math.floor(Math.random() * words.length)];

      const letters = ((arr) => {
        for (let i = arr.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [arr[i], arr[j]] = [arr[j], arr[i]];
        }
        return arr;
      })(seed.split("").filter((a, i, arr) => arr.indexOf(a) === i));

      setLetters(letters);
      return true;
    });

    Promise.all([w, s]).then(() => setLoading(false));
  }, []);

  return (
    <div id="app">
      <nav>
        <h1>Spelling Circle</h1>
      </nav>
      <main>
        {loading ? (
          <Loading />
        ) : (
          <>
            <div>
              <LettersInput letters={letters} submitWord={submitWord} />
              <Letters letters={letters} />
            </div>
            <WordList words={foundWords} />{" "}
          </>
        )}
      </main>
    </div>
  );
};

export default App;
