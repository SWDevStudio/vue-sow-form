import useForm from "@/compose/useForm";
import { computed, onMounted, onUnmounted, ref, Ref, watch } from "vue";
import { IFormRule } from "@/interface/IFormRule";
import { IField } from "@/interface/IField";
import { IError } from "@/interface/IError";

interface FieldOptions {
  readonly name?: string;
  readonly modelValue: Ref<string>;
  readonly rules: IFormRule[];
}

export default function useField(options: FieldOptions) {
  const { registerField, unregisterField, checkValid } = useForm();

  const fieldKey: Ref<null | number> = ref(null);

  const serverError: Ref<null | IError> = ref(null);
  function addServerError(error: IError) {
    serverError.value = error;
  }

  function removeServerError() {
    serverError.value = null;
  }

  watch(options.modelValue, () => {
    removeServerError();
    checkValid();
  });

  const invalidMessage = computed(
    () =>
      serverError.value?.message ||
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
    addServerError,
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
    serverError,
    addServerError,
    removeServerError,
  };
}
