import { FunctionalComponent, h } from "preact";

type LettersProps = {
  letters: string[];
  onShuffle?: () => void;
};

const Letters: FunctionalComponent<LettersProps> = ({ letters, onShuffle }) => (
  <div class="letters">
    <div class="grid">
      {letters.map((l, i) => (
        <div key={i} className={i == 0 ? "letter center" : "letter"}>
          <span>{l}</span>
        </div>
      ))}
    </div>
    <div class="controls">
      <button class="shuffle" onClick={onShuffle}>
        Shuffle
      </button>
    </div>
  </div>
);

export default Letters;
