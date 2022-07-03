import { expect, test } from "@oclif/test";

import Attempt from "../src/Attempt";
import Keyboard from "../src/Keyboard";
import { Color } from "../src/Alphabet";

describe("Attempt", () => {
  it("gets initialised with defasults", () => {
    const testAttempt = new Attempt(new Keyboard());
    expect(testAttempt.isFilled).to.equal(false);
    expect(testAttempt.word.length).to.equal(0);
  });

  it("submit a word to it", () => {
    const testAttempt = new Attempt(new Keyboard());
    testAttempt.submit("START");
    expect(testAttempt.word.length).to.equal(5);
  });

  it("toString convert to string", () => {
    const testAttempt = new Attempt(new Keyboard());
    testAttempt.submit("START");
    expect(testAttempt.toString()).to.equal("START");
  });

  describe("updateMatchStatus", () => {
    it("updates the color of the letters in full match", () => {
      const testAttempt = new Attempt(new Keyboard());
      const matchTargetWord = "START";
      const inputWord = "START";
      testAttempt.submit(inputWord);
      testAttempt.updateMatchStatus(matchTargetWord);
      testAttempt.word.forEach((letter) => {
        expect(letter.getColor()).to.equal(Color.green);
      });
      matchTargetWord.split("").forEach((letter) => {
        expect(testAttempt.keyboard.letters[letter].getColor()).to.equal(
          Color.green
        );
      });
    });
    it("updates the color in partial match", () => {
      const testAttempt = new Attempt(new Keyboard());
      const partialMatch = "ROAST";
      const inputWord = "START";
      testAttempt.submit(inputWord);
      testAttempt.updateMatchStatus(partialMatch);
      const colors = testAttempt.word.reduce(
        (prevColor, letter) => prevColor + letter.getColor(),
        ""
      );
      expect(colors).to.equal("YellowYellowGreenYellowGreen");
    });
    it("updates the color in full mismatch", () => {
      const testAttempt = new Attempt(new Keyboard());
      const inputWord = "START";
      const noMatch = "KILLE";
      testAttempt.submit(inputWord);
      testAttempt.updateMatchStatus(noMatch);
      const colors = testAttempt.word.reduce(
        (prevColor, letter) => prevColor + letter.getColor(),
        ""
      );
      expect(colors).to.equal("GreyGreyGreyGreyGrey");
    });
    it("updates the color in keyboard", () => {
      const keyboard = new Keyboard();
      const testAttempt = new Attempt(keyboard);
      const partialMatch = "ROAST";
      const inputWord = "START";
      testAttempt.submit(inputWord);
      testAttempt.updateMatchStatus(partialMatch);
      const color = Object.keys(keyboard.letters).reduce(
        (prevColor, letter) => prevColor + keyboard.letters[letter].getColor(),
        ""
      );
      expect(color).to.equal(
        "GreenBlackBlackBlackBlackBlackBlackBlackBlackBlackBlackBlackBlackBlackBlackBlackBlackYellowYellowGreenBlackBlackBlackBlackBlackBlack"
      );
    });
  });
});
