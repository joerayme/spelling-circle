import { h } from "preact";
import { fireEvent, render, screen, waitFor } from "@testing-library/preact";
import Letters from "./letters";
import LettersInput from "./lettersInput";

jest.mock("./lettersInput");

describe("Letters", () => {
  beforeEach(() => {
    jest.restoreAllMocks();
    (LettersInput as jest.Mock).mockImplementation(
      ({ currentWord, letters, disableInput }) => (
        <div>
          <p data-testid="currentWord">{currentWord}</p>
          <p data-testid="letters">{letters.join("")}</p>
          <p data-testid="disableInput">{disableInput.toString()}</p>
        </div>
      )
    );
  });

  it("should display available letters", async () => {
    const letters = ["a", "b", "c", "d", "e", "f", "g"];
    render(
      <Letters
        letters={letters}
        disableInput={false}
        onShuffle={jest.fn()}
        submitWord={jest.fn()}
      />
    );

    const buttons = await screen.findAllByRole("button");

    for (let i = 0; i < letters.length; i++) {
      expect(buttons[i].textContent).toEqual(letters[i]);
    }
  });

  it("should set correct properties on LettersInput", async () => {
    const letters = ["a", "b", "c", "d", "e", "f", "g"];
    render(
      <Letters
        letters={letters}
        disableInput={false}
        onShuffle={jest.fn()}
        submitWord={jest.fn()}
      />
    );

    const lettersElem = await screen.findByTestId("letters");
    const disableInput = await screen.findByTestId("disableInput");

    expect(lettersElem.textContent).toEqual(letters.join(""));
    expect(disableInput.textContent).toEqual("false");
  });

  it("should send input to LettersInput", async () => {
    const letters = ["a", "b", "c", "d", "e", "f", "g"];
    render(
      <Letters
        letters={letters}
        disableInput={false}
        onShuffle={jest.fn()}
        submitWord={jest.fn()}
      />
    );

    const buttons = await screen.findAllByRole("button");

    fireEvent.click(buttons[0]);
    fireEvent.click(buttons[1]);

    await waitFor(async () => {
      const currentWord = await screen.findByTestId("currentWord");
      expect(currentWord.textContent).toEqual("ab");
    });
  });

  it("should submit a word when enter button is pressed", async () => {
    const letters = ["a", "b", "c", "d", "e", "f", "g"];
    const submitWord = jest.fn();
    render(
      <Letters
        letters={letters}
        disableInput={false}
        onShuffle={jest.fn()}
        submitWord={submitWord}
      />
    );

    const buttons = await screen.findAllByRole("button");
    const submit = await screen.findByText("Enter");

    fireEvent.click(buttons[0]);
    fireEvent.click(buttons[1]);
    fireEvent.click(submit);

    expect(submitWord).toHaveBeenCalledWith("ab");
  });

  it("should submit a word when enter is pressed", async () => {
    const letters = ["a", "b", "c", "d", "e", "f", "g"];
    const submitWord = jest.fn();
    render(
      <Letters
        letters={letters}
        disableInput={false}
        onShuffle={jest.fn()}
        submitWord={submitWord}
      />
    );

    const buttons = await screen.findAllByRole("button");

    fireEvent.click(buttons[0]);
    fireEvent.click(buttons[1]);
    fireEvent.keyDown(document.activeElement || document.body, {
      key: "Enter",
    });

    expect(submitWord).toHaveBeenCalledWith("ab");
  });

  it("should select letters when typed and ignore other letters", async () => {
    const letters = ["a", "b", "c", "d", "e", "f", "g"];
    render(
      <Letters
        letters={letters}
        disableInput={false}
        onShuffle={jest.fn()}
        submitWord={jest.fn()}
      />
    );

    fireEvent.keyDown(document.activeElement || document.body, {
      key: "a",
    });
    fireEvent.keyDown(document.activeElement || document.body, {
      key: "b",
    });
    fireEvent.keyDown(document.activeElement || document.body, {
      key: "z",
    });

    await waitFor(async () => {
      const currentWord = await screen.findByTestId("currentWord");
      expect(currentWord.textContent).toEqual("ab");
    });
  });

  it("should delete letters when backspace is used", async () => {
    const letters = ["a", "b", "c", "d", "e", "f", "g"];
    render(
      <Letters
        letters={letters}
        disableInput={false}
        onShuffle={jest.fn()}
        submitWord={jest.fn()}
      />
    );

    fireEvent.keyDown(document.activeElement || document.body, {
      key: "a",
    });
    fireEvent.keyDown(document.activeElement || document.body, {
      key: "b",
    });
    fireEvent.keyDown(document.activeElement || document.body, {
      key: "Backspace",
    });

    await waitFor(async () => {
      const currentWord = await screen.findByTestId("currentWord");
      expect(currentWord.textContent).toEqual("a");
    });
  });

  it("should shuffle when the shuffle button is clicked", async () => {
    const letters = ["a", "b", "c", "d", "e", "f", "g"];
    const shuffle = jest.fn();
    render(
      <Letters
        letters={letters}
        disableInput={false}
        onShuffle={shuffle}
        submitWord={jest.fn()}
      />
    );

    const shuffleButton = await screen.findByText("Shuffle");

    fireEvent.click(shuffleButton);

    expect(shuffle).toHaveBeenCalledTimes(1);
  });

  it("should disable input when disableInput is set", async () => {
    const letters = ["a", "b", "c", "d", "e", "f", "g"];
    const submitWord = jest.fn();
    render(
      <Letters
        letters={letters}
        disableInput={true}
        onShuffle={jest.fn()}
        submitWord={submitWord}
      />
    );

    const buttons = await screen.findAllByRole("button");
    const submit = await screen.findByText("Enter");

    fireEvent.click(buttons[0]);
    fireEvent.click(buttons[1]);
    fireEvent.keyDown(document.activeElement || document.body, {
      key: "b",
    });
    fireEvent.click(submit);

    expect(submitWord).not.toHaveBeenCalled();

    await waitFor(async () => {
      const currentWord = await screen.findByTestId("currentWord");
      expect(currentWord.textContent).toEqual("");
    });
  });
});
