(async () => {
  const w = fetch("./wordlist.txt").then(async (response) =>
    (await response.text()).split("\n")
  );
  const s = fetch("./seedwords.txt").then(async (response) => {
    const words = (await response.text()).split("\n");
    return words[Math.floor(Math.random() * words.length)];
  });
  const letterContainer = document.getElementById("letters");
  const inputContainer = document.getElementById("input");
  const wordlistContainer = document.getElementById("wordlist");

  const foundWords = [];

  const [words, seed] = await Promise.all([w, s]);

  let currentWord = "";

  const loader = document.getElementById("loading");
  loader.parentElement.removeChild(loader);

  const letters = ((arr) => {
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  })(seed.split("").filter((a, i, arr) => arr.indexOf(a) === i));

  for (var i in letters) {
    const el = document.createElement("div");
    el.textContent = letters[i];
    el.setAttribute("class", "letter" + (i == 0 ? " center" : ""));
    letterContainer.appendChild(el);
  }

  window.onkeydown = (e) => {
    const letter = e.key.toLowerCase();
    if (letters.includes(letter)) {
      const l = document.createElement("span");
      if (letter === letters[0]) {
        l.setAttribute("class", "highlight");
      }
      l.textContent = letter;
      inputContainer.appendChild(l);

      currentWord += letter;
    } else if (letter == "backspace") {
      inputContainer.removeChild(inputContainer.lastChild);

      currentWord = currentWord.slice(0, currentWord.length - 2);
    } else if (letter == "enter") {
      if (
        currentWord.includes(letters[0]) &&
        words.includes(currentWord) &&
        !foundWords.includes(currentWord)
      ) {
        foundWords.push(currentWord);

        const el = document.createElement("li");
        el.textContent = currentWord;
        wordlistContainer.appendChild(el);
      }

      while (inputContainer.firstChild) {
        inputContainer.removeChild(inputContainer.firstChild);
      }

      currentWord = "";
    }
  };
})();
