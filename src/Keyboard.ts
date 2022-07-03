import Alphabet, { Color } from "./Alphabet";

interface AlphabetMap {
  [index: string]: Alphabet;
}

export default class Keyboard {
  letters: AlphabetMap;

  constructor() {
    this.letters = {};
    for (let i = "A".charCodeAt(0); i <= "Z".charCodeAt(0); i++) {
      let currLetter = String.fromCharCode(i);
      this.letters[currLetter] = new Alphabet(currLetter);
    }
  }

  updateColor(letter: string, color: Color) {
    this.letters[letter].setColour(color);
  }
  print() {
    const offset = "A".charCodeAt(0);
    for (let i = 0; i < 26; i++) {
      let curLetter = String.fromCharCode(i + offset);
      this.letters[curLetter].print();
      if ((i + 1) % 7 == 0) {
        console.log("");
      }
    }
    console.log("");
  }
}
