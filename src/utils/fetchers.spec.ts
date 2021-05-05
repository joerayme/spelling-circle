global.atob = require("atob");
import {
  getAllWords,
  getLettersFromLocationHash,
  getNewLetters,
} from "./fetchers";
import { shuffle } from "./words";

global.fetch = jest.fn(() =>
  Promise.resolve({
    text: () => Promise.resolve("wordone\nwordtwo\nwordthree"),
  })
) as any;

const mockMath = Object.create(global.Math);
mockMath.random = jest.fn().mockReturnValue(0);
global.Math = mockMath;

global.window = Object.create(window);
Object.defineProperty(global.window, "location", { value: {} });

jest.mock("./words");

describe("fetchers", () => {
  describe("getNewLetters", () => {
    it("should get random new letters from the seeds list", async () => {
      const allWords = Promise.resolve([
        "wordone",
        "oneword",
        "wordtwo",
        "twoword",
        "wordthree",
        "threeword",
      ]);
      ((shuffle as any) as jest.Mock<typeof shuffle>).mockImplementation(
        (letters) => letters
      );

      const response = await getNewLetters(allWords);

      expect(response.letters).toEqual(["w", "o", "r", "d", "n", "e"]);
      expect(response.availableWords).toEqual(["wordone", "oneword"]);
    });
  });

  describe("getAllWords", () => {
    it("should return an array of words from the fetch response", async () => {
      const response = await getAllWords();

      expect(response).toEqual(["wordone", "wordtwo", "wordthree"]);
    });
  });

  describe("getLettersFromLocationHash", () => {
    const allWords = Promise.resolve([
      "wordone",
      "oneword",
      "wordtwo",
      "twoword",
      "wordthree",
      "threeword",
    ]);

    it("should return false if there's no location hash", async () => {
      global.window.location.hash = "";

      const response = await getLettersFromLocationHash(allWords);

      expect(response).toEqual(false);
    });

    it("should return false if it can't base64 decode the data", async () => {
      global.window.location.hash = "#€£lsdfa";

      const response = await getLettersFromLocationHash(allWords);

      expect(response).toEqual(false);
    });

    it("should return false if the letter count is not 7", async () => {
      global.window.location.hash = "#YXNkZmdo"; // asdfgh

      const responseWithSixChars = await getLettersFromLocationHash(allWords);

      expect(responseWithSixChars).toEqual(false);

      global.window = {
        location: {
          hash: "#YXNkZmdoams=", // asdfghjk
        } as Location,
      } as Window & typeof globalThis;

      const responseWithEightChars = await getLettersFromLocationHash(allWords);

      expect(responseWithEightChars).toEqual(false);
    });

    it("should return available words if the letter count is 7", async () => {
      global.window.location.hash = "#b25ld2FyZA=="; // oneward

      const response = await getLettersFromLocationHash(allWords);

      expect(response).toEqual({
        letters: ["o", "n", "e", "w", "a", "r", "d"],
        availableWords: ["wordone", "oneword"],
      });
    });
  });
});
