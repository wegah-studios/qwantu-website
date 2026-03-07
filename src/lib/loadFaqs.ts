import { FAQ } from "@/types/common";
import { readFileSync } from "fs";
import { join } from "path";

const loadFaqs = (limit?: number): FAQ[] => {
  const servicesPath = join(process.cwd(), "src/data/faqs.json");
  let data = JSON.parse(readFileSync(servicesPath, "utf-8")) as FAQ[];
  if (limit) {
    data = data.slice(0, limit);
  }
  return data;
};

export default loadFaqs;
