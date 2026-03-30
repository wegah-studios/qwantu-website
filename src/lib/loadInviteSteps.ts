import { InviteStep } from "@/types/common";
import { readFileSync } from "fs";
import { join } from "path";

const loadInviteSteps = (): InviteStep[] => {
  const servicesPath = join(process.cwd(), "src/data/inviteSteps.json");
  let data = JSON.parse(readFileSync(servicesPath, "utf-8")) as InviteStep[];
  
  return data;
};

export default loadInviteSteps;
