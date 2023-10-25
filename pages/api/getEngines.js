import openai from "@/lib/chatgpt";

export default async function handler(req, res) {
  // get openai models
  const models = await openai.models
    .list()
    .then((res) => res.data)
    .catch((err) => {
      return `Error while fetching models`;
    });

  const modelOptions = models?.map((model) => {
    return {
      label: model.id,
      value: model.id,
    };
  });

  res.status(200).json({ modelOptions });
}
