// utils/parseContent.js

import { remark } from "remark";
import html from "remark-html";

export async function parseContent(text) {
  const processedContent = await remark().use(html).process(text);
  return processedContent.toString();
}
