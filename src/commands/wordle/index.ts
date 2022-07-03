import { Command, Flags, CliUx } from "@oclif/core";

import Alphabet, { Color } from "../../Alphabet";
import Game from "../../Game";
import WordHelper, { WORDL_LENGTH } from "../../helpers/WordHelper";
import WordleError from "../../WordleError";

export default class Wordle extends Command {
  static description = "Wordle Game CLI version";

  // static flags = {
  //   from: Flags.string({char: 'f', description: 'Whom is saying hello', required: true}),
  // }

  static args = [
    { name: "action", description: "Action to the game", required: true },
  ];
  async run(): Promise<void> {
    let game: Game;
    const { args, flags } = await this.parse(Wordle);

    if (args.action === "start") {
      const targetWord = await WordHelper.getRandomWord();
      // console.log("new target word : " + targetWord.toUpperCase());
      game = new Game({ word: targetWord.toUpperCase(), maxAttempts: 6 });
      do {
        let inputWord = await CliUx.ux.prompt("What is your word guess?");
        inputWord = inputWord.trim().toUpperCase();
        if (inputWord === "Q") {
          break;
        } else if (inputWord === "?") {
          console.log("usage: Q - Quit, ? - For help, K - Print keyboard.");
        } else if (inputWord === "K") {
          game.keyboard.print();
        } else if (WordHelper.isValidWord(inputWord)) {
          try {
            let isDictionaryWord = await WordHelper.isDictionaryWord(inputWord);
            if (isDictionaryWord) {
              game.guess(inputWord);
              game.print();
              if (game.isWon) {
                break;
              }
            } else {
              console.log(
                "You entered an invalid word..., Please use dictionary words."
              );
            }
          } catch (error) {
            if (error instanceof WordleError) {
              console.log("You entered an invalid word...");
            } else {
              throw error;
            }
          }
        } else {
          console.log(
            `You entered an invalid word..., Use ${WORDL_LENGTH} letter words.`
          );
        }
      } while (game.currentAttempt < game.totalAttempts);
    }
  }
}
