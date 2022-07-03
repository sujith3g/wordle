import Alphabet, { Color } from "./Alphabet";
import Keyboard from "./Keyboard";
import WordleError from "./WordleError";
import { WORDL_LENGTH } from "./helpers/WordHelper";

export default class Attempt {
  isFullMatch: boolean;
  wordLength: number;
  word: Alphabet[];
  keyboard: Keyboard;

  constructor(keyboard: Keyboard) {
    this.wordLength = WORDL_LENGTH;
    this.isFullMatch = false;
    this.word = [];
    this.keyboard = keyboard;
  }

  isMatch(): boolean {
    return this.isFullMatch;
  }

  submit(word: string) {
    const that = this;
    word.split("").forEach((letter, index) => {
      that.word[index] = new Alphabet(letter);
    });
  }

  toString(): string {
    return this.word.reduce((prev, curr) => {
      return prev + curr.toString();
    }, "");
  }

  updateMatchStatus(targetWord: string) {
    // go through each letter of the word
    // and update the color based on the target word
    const that = this;
    let isFullMatch = true;
    this.word.forEach((letter, index) => {
      let color: Color = Color.black;
      let searchIndex = targetWord.indexOf(letter.getValue());
      if (searchIndex === -1) {
        color = Color.grey;
        isFullMatch = false;
      } else if (searchIndex > -1) {
        if (targetWord[index] === letter.getValue()) {
          color = Color.green;
        } else {
          color = Color.yellow;
          isFullMatch = false;
        }
      }
      letter.setColour(color);
      that.keyboard.updateColor(letter.getValue(), color);
    });
    if (isFullMatch) {
      this.isFullMatch = true;
    }
  }

  print() {
    this.word.forEach((letter) => {
      letter.print();
    });
  }
}
