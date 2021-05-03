import { h } from "preact";

const Letters = ({ letters }) => (
  <div class="letters">
    {letters.map((l, i) => (
      <div key={i} className={i == 0 ? "letter center" : "letter"}>
        <span>{l}</span>
      </div>
    ))}
  </div>
);

export default Letters;
