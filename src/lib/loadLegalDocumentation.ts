import { readFileSync } from "fs";
import { join } from "path";

const loadLegalDocumentation = (
  type:
    | "privacy-policy"
    | "terms-of-service"
    | "refund-policy"
    | "invites-policy",
): { title: string; description: string }[] => {
  const legalPath = join(process.cwd(), "src/data/legal.json");
  return JSON.parse(readFileSync(legalPath, "utf-8"))[type];
};

export default loadLegalDocumentation;
