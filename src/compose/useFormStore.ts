import { ISowForm } from "@/interface/ISowForm";
import useForm from "@/compose/useForm";
// class FormStore {
//   static globalForm: ISowForm = useForm({ formId: "sow-form-global" });
//
//   static formList: ISowForm[] = [];
// }

let globalForm: ISowForm;
let formList: ISowForm[] = [];

export default function useFormStore() {
  function getGlobalForm() {
    if (!globalForm) globalForm = useForm({ formId: "sow-form-global" });

    return globalForm;
  }

  function getFormById(id?: string) {
    if (!id) return null;
    return formList.find((f) => f.id === id);
  }

  function register(form: ISowForm) {
    // const formIsExist = getFormById(form.id);
    // if (formIsExist) return;
    formList.push(form);
  }

  function unregister(id: string) {
    formList = formList.filter((f) => f.id === id);
  }

  function get(formId?: string) {
    if (!formId) {
      return getGlobalForm();
    }

    return getFormById(formId) || getGlobalForm();
  }

  return {
    register,
    unregister,
    get,
  };
}
