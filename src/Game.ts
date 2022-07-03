import Attempt from "./Attempt";
import Alphabet from "./Alphabet";
import Keyboard from "./Keyboard";

export default class Game {
  targetWord: string;
  totalAttempts: number;
  currentAttempt: number;
  attempts: Attempt[];
  keyboard: Keyboard;
  isWon: boolean;

  constructor(config: { word: string; maxAttempts: number }) {
    this.targetWord = config.word;
    this.totalAttempts = config.maxAttempts;
    this.currentAttempt = 0;
    this.attempts = [];
    this.isWon = false;
    this.keyboard = new Keyboard();
    for (let i = 0; i < this.totalAttempts; i++) {
      this.attempts[i] = new Attempt(this.keyboard);
    }
  }

  guess(guessWord: string) {
    if (this.currentAttempt >= this.totalAttempts) {
      console.log("No more attempts left...");
      return;
    }
    const currentAttempt = this.attempts[this.currentAttempt];
    currentAttempt.submit(guessWord);
    currentAttempt.updateMatchStatus(this.targetWord);
    this.currentAttempt++;
    if (currentAttempt.isMatch()) {
      this.isWon = true;
      console.log(" game won");
      return;
    }
  }

  print() {
    const that = this;
    this.attempts.forEach((attempt, index) => {
      if (index < this.currentAttempt) {
        attempt.print();
        console.log("");
      }
    });
  }
}
