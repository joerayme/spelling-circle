import { h, FunctionalComponent } from "preact";

type ProgressProps = {
  availableWords: string[];
  foundWords: string[];
};

const Progress: FunctionalComponent<ProgressProps> = ({
  availableWords,
  foundWords,
}) => {
  const progress = Math.floor(
    (foundWords.length / availableWords.length) * 100
  );

  return (
    <div class="progress">
      <div class="indicator" style={`width: ${progress}%`}>
        <span class="value">{progress}</span>
      </div>
    </div>
  );
};

export default Progress;
