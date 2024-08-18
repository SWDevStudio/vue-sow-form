import { ComputedRef, Ref, WritableComputedRef } from "vue";

export interface IField {
  readonly name?: string;
  readonly key: Ref<number | null>;
  readonly isValid: ComputedRef<boolean>;
  readonly modelValue: WritableComputedRef<string> | Ref<string>;
}
