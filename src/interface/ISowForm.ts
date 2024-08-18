import { IField } from "@/interface/IField";

export interface ISowForm {
  registerField: (field: IField) => number;
  unregisterField: (fieldKey: number) => void;
}
