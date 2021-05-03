import { h } from "preact";

const Letters = ({ letters }) => (
  <div class="letters">
    {letters.map((l, i) => (
      <div key={i} className={i == 0 ? "letter center" : "letter"}>
        {l}
      </div>
    ))}
  </div>
);

export default Letters;
