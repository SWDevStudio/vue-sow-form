import { IRuleFunction } from "@/interface/IRuleFunction";

export default (length: number): IRuleFunction =>
  (v) =>
    v.length >= length;
