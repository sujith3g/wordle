import { expect, test } from "@oclif/test";
import Alphabet, { Color } from "../src/Alphabet";

describe("Alphabet", () => {
  it("should create on from a letter", () => {
    const letter = "A";
    const myLetter = new Alphabet(letter);
    expect(myLetter.value).to.equal(letter);
    expect(myLetter.color).to.equal(Color.black);
  });

  it("setColour, update the color", () => {
    const letter = "A";
    const myLetter = new Alphabet(letter);
    expect(myLetter.color).to.equal(Color.black);
    myLetter.setColour(Color.green);
    expect(myLetter.color).to.equal(Color.green);
  });
  it("prints with color", () => {
    const letter = "A";
    const myLetter = new Alphabet(letter);
    expect(myLetter.color).to.equal(Color.black);
    myLetter.print();
    myLetter.setColour(Color.green);
    myLetter.print();
    expect(myLetter.color).to.equal(Color.green);
  });
});
