// import OpenAI, { Configuration, OpenAIApi } from "openai";

// const configuration = new Configuration({
//   apiKey: process.env.OPEN_AI_SECRET_KEY,
// });
// console.log(process.env.OPEN_AI_SECRET_KEY);
// const openai = new OpenAIApi(configuration);
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPEN_AI_SECRET_KEY,
});

export default openai;
