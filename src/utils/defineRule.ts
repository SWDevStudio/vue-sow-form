import { IRuleFunction } from "@/interface/IRuleFunction";

export default function defineRule(fn: IRuleFunction, message: string) {
  return {
    fn,
    message,
  };
}
