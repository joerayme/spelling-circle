import { FunctionalComponent, h } from "preact";
import { useState } from "preact/hooks";
import LettersInput from "./lettersInput";

type LettersProps = {
  letters: string[];
  onShuffle?: () => void;
  submitWord: (word: string) => void;
  disableInput: boolean;
};

const Letters: FunctionalComponent<LettersProps> = ({
  letters,
  onShuffle,
  submitWord,
  disableInput,
}) => {
  const [currentWord, setCurrentWord] = useState("");
  const [lastKeyPressed, setLastKeyPressed] = useState("");

  const submit = () => {
    if (!disableInput) {
      submitWord(currentWord);
      setCurrentWord("");
    }
  };

  const chooseLetter = (letter: string) => {
    if (!disableInput) {
      if (letters.includes(letter)) {
        setCurrentWord(currentWord + letter);
      } else if (letter == "backspace") {
        setCurrentWord(currentWord.slice(0, currentWord.length - 1));
      } else if (letter == "enter") {
        submit();
      }
    }
  };

  window.onkeydown = (e: KeyboardEvent) => {
    if (!e.altKey && !e.ctrlKey && !e.metaKey) {
      e.preventDefault();
      setLastKeyPressed(e.key.toLowerCase());
      chooseLetter(e.key.toLowerCase());
    }
  };

  return (
    <div class="letters">
      <LettersInput
        letters={letters}
        currentWord={currentWord}
        disableInput={disableInput}
      />
      <div class="grid">
        {letters.map((l, i) => (
          <div key={i} className={i == 0 ? "letter center" : "letter"}>
            <button
              className={lastKeyPressed === l ? "pressed" : ""}
              onClick={() => chooseLetter(l)}
            >
              {l}
            </button>
          </div>
        ))}
      </div>
      <div class="controls">
        <button className="shuffle" onClick={onShuffle}>
          Shuffle
        </button>
        <button
          className={"submit" + (lastKeyPressed === "enter" ? " pressed" : "")}
          onClick={() => submit()}
        >
          Enter
        </button>
      </div>
    </div>
  );
};

export default Letters;
