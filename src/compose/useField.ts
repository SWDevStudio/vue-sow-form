import useForm from "@/compose/useForm";
import { computed, onMounted, onUnmounted, ref, Ref } from "vue";
import { IFormRule } from "@/interface/IFormRule";
import { IField } from "@/interface/IField";

interface FieldOptions {
  name?: string;
  modelValue: Ref<string>;
  rules: IFormRule[];
}

export default function useField(options: FieldOptions) {
  const { registerField, unregisterField } = useForm();
  const fieldKey: Ref<null | number> = ref(null);

  const invalidMessage = computed(
    () =>
      options.rules.find(({ fn }) => !fn(options.modelValue.value))?.message ||
      ""
  );

  const isValid = computed(() => !invalidMessage.value);

  const fieldData: IField = {
    modelValue: options.modelValue,
    isValid: isValid,
    key: fieldKey,
    invalidMessage: invalidMessage,
    name: options.name,
  };

  onMounted(() => {
    fieldKey.value = registerField(fieldData);
  });

  onUnmounted(() => {
    if (fieldKey.value) unregisterField(fieldKey.value);
  });

  return {
    isValid,
    invalidMessage,
  };
}
