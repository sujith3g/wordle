import axios from "axios";
import WordleError from "../WordleError";
import config from "../config";

export const WORDL_LENGTH = config.WORDL_LENGTH;

export const WordHelper = {
  getRandomWord: async (): Promise<string> => {
    const options = {
      method: "GET",
      url: "https://random-words5.p.rapidapi.com/getMultipleRandom",
      params: { count: "1", wordLength: `${WORDL_LENGTH}` },
      headers: {
        "X-RapidAPI-Key": `${config.RAPID_API_KEY}`,
        "X-RapidAPI-Host": "random-words5.p.rapidapi.com",
      },
    };

    let result = "";
    try {
      const { data } = await axios.request(options);
      result = data[0];
    } catch (error) {
      throw error;
    }
    return result;
  },
  isDictionaryWord: async (word: string): Promise<boolean> => {
    const options = {
      method: "GET",
      url: "https://api.dictionaryapi.dev/api/v2/entries/en/" + word,
    };
    let result = false;
    try {
      const { data } = await axios.request(options);
      if (data) {
        result = true;
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response && error.response.status == 404) {
          result = false;
        }
      } else {
        throw error;
      }
    }
    return result;
  },

  isValidWord(word: string): boolean {
    // pass current word to valid word checking API
    if (word.length != WORDL_LENGTH) {
      return false;
    }
    return true;
  },
};

export default WordHelper;
