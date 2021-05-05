import { h } from "preact";
import { render, screen } from "@testing-library/preact";
import LettersInput from "./lettersInput";

describe("LettersInput", () => {
  it("should render the current word", async () => {
    const input = "aaabb";
    render(
      <LettersInput letters={[]} currentWord={input} disableInput={false} />
    );

    const buttons = await screen.findAllByTestId("letter");

    for (let i = 0; i < input.length; i++) {
      expect(buttons[i].textContent).toEqual(input[i]);
    }

    const textBox = await screen.findByTestId("input");

    expect((textBox as HTMLInputElement).value).toEqual(input);
  });

  it("should highlight the first letter wherever it appears in the word", async () => {
    const input = "aaabb";
    render(
      <LettersInput letters={["b"]} currentWord={input} disableInput={false} />
    );

    const buttons = await screen.findAllByTestId("letter");

    for (let i = 0; i < input.length; i++) {
      expect(buttons[i].textContent).toEqual(input[i]);

      if (input[i] === "b") {
        expect(buttons[i].className).toEqual("highlight");
      }
    }
  });
});
