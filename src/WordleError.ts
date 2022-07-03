export default class WordleError extends Error {
  constructor(args: any) {
    super(args);
    this.name = "WordleError";
  }
}
