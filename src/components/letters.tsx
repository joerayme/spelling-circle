import { FunctionalComponent, h } from "preact";
import { useState } from "preact/hooks";
import LettersInput from "./lettersInput";

type LettersProps = {
  letters: string[];
  onShuffle?: () => void;
  submitWord: (word: string) => void;
};

const Letters: FunctionalComponent<LettersProps> = ({
  letters,
  onShuffle,
  submitWord,
}) => {
  const [currentWord, setCurrentWord] = useState("");

  const submit = () => {
    submitWord(currentWord);
    setCurrentWord("");
  };

  const chooseLetter = (letter: string) => {
    if (letters.includes(letter)) {
      setCurrentWord(currentWord + letter);
    } else if (letter == "backspace") {
      setCurrentWord(currentWord.slice(0, currentWord.length - 1));
    } else if (letter == "enter") {
      submit();
    }
  };

  window.onkeydown = (e: KeyboardEvent) => {
    chooseLetter(e.key.toLowerCase());
  };

  return (
    <div class="letters">
      <LettersInput letters={letters} currentWord={currentWord} />
      <div class="grid">
        {letters.map((l, i) => (
          <div key={i} className={i == 0 ? "letter center" : "letter"}>
            <span onClick={() => chooseLetter(l)}>{l}</span>
          </div>
        ))}
      </div>
      <div class="controls">
        <button class="shuffle" onClick={onShuffle}>
          Shuffle
        </button>
        <button class="submit" onClick={() => submit()}>
          Enter
        </button>
      </div>
    </div>
  );
};

export default Letters;
