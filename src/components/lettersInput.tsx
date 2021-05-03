import { FunctionalComponent, h } from "preact";
import { useState } from "preact/hooks";

type LettersInputProps = {
  letters: string[];
  currentWord: string;
  disableInput: boolean;
};

const LettersInput: FunctionalComponent<LettersInputProps> = ({
  letters,
  currentWord,
  disableInput,
}) => {
  return (
    <div class={"input-container" + (disableInput ? " disabled" : "")}>
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
