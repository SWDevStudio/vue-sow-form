import { IField } from "@/interface/IField";
import {
  computed,
  onDeactivated,
  onMounted,
  onUnmounted,
  provide,
  reactive,
  ref,
  Ref,
} from "vue";
import useFormStore from "@/compose/useFormStore";
import { IError } from "@/interface/IError";
export default function useForm(options: { formId?: string } = {}) {
  const fields: Ref<IField[]> = ref([]);
  const formStore = reactive(useFormStore());

  const errors = computed(() => {
    // Через reduce не хотело работать, не знаю в чем причина
    return Object.fromEntries(
      fields.value.filter((i) => i.name).map((i) => [i.name, i.invalidMessage])
    );
  });

  const isValid = computed(() => {
    return fields.value.every((field) => field.isValid);
  });

  function addError(payload: IError | IError[]) {
    const fn = (err: IError) => {
      const field = fields.value.find((f) => f.name === err.name);
      if (field) field.addServerError(err);
    };

    if (Array.isArray(payload)) payload.forEach((err) => fn(err));
    else fn(payload);
  }

  function registerField(field: IField) {
    fields.value.push(field);
    return fields.value.length;
  }

  function unregisterField(fieldKey: number) {
    fields.value = fields.value.filter((f) => f.key.value !== fieldKey);
  }

  const provideObject = {
    unregisterField,
    registerField,
    addError,
    errors,
    isValid,
    id: options.formId,
    fields,
  };

  function offThis() {
    if (options.formId) formStore.unregister(options.formId);
  }

  onMounted(() => {
    if (options.formId) formStore.register(provideObject);
  });

  onUnmounted(offThis);

  onDeactivated(offThis);

  provide("sow-form", provideObject);

  return provideObject;
}
