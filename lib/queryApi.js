import openai from "./chatgpt";

const query = async (prompt, id, model) => {
  const res = openai.completions
    .create({
      model,
      prompt,
      temperature: 0.9,
      max_tokens: 1000,
      top_p: 0.5,
      frequency_penalty: 0,
      presence_penalty: 0,
    })
    .then((res) => {
      return res?.choices[0]?.text;
    })
    .catch(
      (err) =>
        `Unable to generate respone for the query:${prompt}\nError: ${err.message}`
    );
  return res;
};

export default query;
