import openai from "./chatgpt";
import { parseContent } from "./utils/parser";

const query = async (prompt, id, model) => {
  const res = openai.chat.completions
    .create({
      model,
      messages: [{ role: "system", content: prompt }],
      temperature: 0.9,
      max_tokens: 1000,
      top_p: 0.5,
      frequency_penalty: 0,
      presence_penalty: 0,
    })
    .then(async (res) => {
      const formattedText = await parseContent(res?.choices[0]?.message?.content);
      return formattedText
    })
    .catch(
      (err) =>
        `Unable to generate respone for the query:${prompt}\nError: ${err.message}`
    );
  return res;
};

export default query;
