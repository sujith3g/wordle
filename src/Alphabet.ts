import * as chalk from "chalk";
// const chalk = require("chalk");

export enum Color {
  black = "Black",
  yellow = "Yellow",
  green = "Green",
  grey = "Grey",
}

const default_color: Color = Color.black;
const default_value: string = "";

export default class Alphabet {
  color: Color = default_color;
  value: string = default_value;

  constructor(letter: string) {
    if (letter.length != 1) {
      throw new Error("Invalid Alphabet");
    }
    this.value = letter;
  }

  setColour(color: Color) {
    this.color = color;
  }

  getColor(): Color {
    return this.color;
  }

  getValue(): string {
    return this.value;
  }

  toString(): string {
    return this.value;
  }

  print() {
    let chalkColor;
    switch (this.color) {
      case Color.grey:
        chalkColor = chalk.bold.grey;
        break;
      case Color.yellow:
        chalkColor = chalk.bold.yellow;
        break;
      case Color.green:
        chalkColor = chalk.bold.green;
        break;
      default:
        chalkColor = chalk.bold.white;
        break;
    }
    process.stdout.write(" " + chalkColor(this.getValue()) + " ");
  }
}
