import { inject, reactive } from "vue";
import { ISowForm } from "@/interface/ISowForm";
import useFormStore from "@/compose/useFormStore";

export default async function injectForm(formId?: string): Promise<ISowForm> {
  if (formId) {
    const formStore = reactive(useFormStore());
    await new Promise((res) => {
      setTimeout(() => res(""), 1000);
    });
    return formStore.get(formId) as ISowForm;
  }

  return inject("sow-form") as ISowForm;
}
