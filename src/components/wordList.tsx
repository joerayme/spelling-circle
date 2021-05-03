import { FunctionalComponent, h } from "preact";

type WordListProps = {
  foundWords: string[];
  availableWords: string[];
  onReveal: () => void;
  revealed: boolean;
};

const WordList: FunctionalComponent<WordListProps> = ({
  foundWords,
  availableWords,
  onReveal,
  revealed = false,
}) => (
  <div class="wordlist">
    <h2>Found words</h2>
    <p>
      <button class="reveal" onClick={onReveal} disabled={revealed}>
        Reveal all words
      </button>
    </p>
    <p>
      {foundWords.length} word{foundWords.length != 1 ? "s" : ""} found
    </p>
    <ol>
      {(revealed ? availableWords : foundWords).map((w, i) => {
        let suffix = "";
        if (revealed && foundWords.includes(w)) {
          suffix = " ✅";
        }
        return (
          <li
            key={i}
            className={revealed && foundWords.includes(w) ? "highlight" : ""}
          >
            {w}
            {suffix}
          </li>
        );
      })}
    </ol>
  </div>
);

export default WordList;
