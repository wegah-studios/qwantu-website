import { Step } from "@/types/common";
import { readFileSync } from "fs";
import { join } from "path";

const loadSteps = (type: "invite" | "delete"): Step[] => {
  const servicesPath = join(process.cwd(), "src/data/steps.json");
  let data = JSON.parse(readFileSync(servicesPath, "utf-8")) as Record<
    "invite" | "delete",
    Step[]
  >;

  return data[type];
};

export default loadSteps;
