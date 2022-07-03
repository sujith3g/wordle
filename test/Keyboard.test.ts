import { expect, test } from "@oclif/test";

import { Color } from "../src/Alphabet";
import Keyboard from "../src/Keyboard";

describe("Keyboard ", () => {
  it("has gets initialised with all letter", () => {
    const keyboard = new Keyboard();
    expect(Object.keys(keyboard.letters).length).to.equal(26);
    expect(keyboard.letters["A"].color).to.equal(Color.black);
    expect(keyboard.letters["A"].getValue()).to.equal("A");
    expect(keyboard.letters["Z"].color).to.equal(Color.black);
  });
  it("updateColor to set color of letter", () => {
    const keyboard = new Keyboard();
    const letter = "B";
    const color = Color.green;
    expect(keyboard.letters[letter].getColor()).to.equal(Color.black);
    keyboard.updateColor(letter, color);
    expect(keyboard.letters[letter].getColor()).to.equal(color);
  });
});
