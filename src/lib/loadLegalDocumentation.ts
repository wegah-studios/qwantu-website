import { readFileSync } from "fs";
import { join } from "path";

const loadLegalDocumentation = (
  type: "privacy-policy" | "terms-of-service"
): { title: string; description: string }[] => {
  const legalPath = join(process.cwd(), "src/data/legal.json");
  return JSON.parse(readFileSync(legalPath, "utf-8"))[type];
};

export default loadLegalDocumentation;
