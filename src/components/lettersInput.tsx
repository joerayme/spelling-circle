import { FunctionalComponent, h } from "preact";

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
      <p aria-hidden={true}>
        {currentWord.split("").map((l, i) => (
          <span
            className={l === letters[0] ? "highlight" : ""}
            data-testid="letter"
            key={i}
          >
            {l}
          </span>
        ))}
      </p>
      <input
        type="text"
        id="lettersInput"
        value={currentWord}
        data-testid="input"
      />
    </div>
  );
};

export default LettersInput;
