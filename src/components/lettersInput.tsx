import { FunctionalComponent, h } from "preact";
import { useState } from "preact/hooks";

type LettersInputProps = {
  letters: string[];
  submitWord: (word: string) => void;
};

const LettersInput: FunctionalComponent<LettersInputProps> = ({
  letters,
  submitWord,
}) => {
  const [currentWord, setCurrentWord] = useState("");

  window.onkeydown = (e: KeyboardEvent) => {
    const letter = e.key.toLowerCase();
    if (letters.includes(letter)) {
      setCurrentWord(currentWord + letter);
    } else if (letter == "backspace") {
      setCurrentWord(currentWord.slice(0, currentWord.length - 1));
    } else if (letter == "enter") {
      submitWord(currentWord);
      setCurrentWord("");
    }
  };

  return (
    <div class="input-container">
      <div>
        {currentWord.split("").map((l, i) => (
          <span className={l === letters[0] ? "highlight" : ""} key={i}>
            {l}
          </span>
        ))}
      </div>
    </div>
  );
};

export default LettersInput;
