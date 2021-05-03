import { FunctionalComponent, h } from "preact";

type WordListProps = {
  words: string[];
};

const WordList: FunctionalComponent<WordListProps> = ({ words }) => (
  <div class="wordlist">
    <h2>Found words</h2>
    <p>
      {words.length} word{words.length != 1 ? "s" : ""} found
    </p>
    <ol>
      {words.map((w, i) => (
        <li key={i}>{w}</li>
      ))}
    </ol>
  </div>
);

export default WordList;
