import { IField } from "@/interface/IField";
import { Ref } from "vue";

export interface ISowForm {
  registerField: (field: IField) => number;
  unregisterField: (fieldKey: number) => void;
  errors: Ref<object>;
}
