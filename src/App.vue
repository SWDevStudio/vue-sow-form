<template>
  <div>
    <!--    <div>is valid: {{ isValid }}</div>-->
    <SowForm ref="formRef">
      <template #default="{ isValid }">
        {{ isValid }}
        <TField v-model="form.name" :rules="rules.name" />
        <TField v-model="form.address" :rules="rules.name" name="address" />
        <SowError name="name" />
        <TNamedForm />
      </template>
    </SowForm>
  </div>
</template>

<script lang="ts" setup>
import SowForm from "@/components/SowForm.vue";
import TField from "@/test-components/TField.vue";
import { onMounted, ref } from "vue";
import defineRule from "@/utils/defineRule";
import { minLength, require } from "@/rules";
import { ComponentExposed } from "vue-component-type-helpers";
import defineError from "@/utils/defineError";
import TNamedForm from "@/test-components/TNamedForm.vue";
import SowError from "@/components/SowError.vue";

const formRef = ref<ComponentExposed<typeof SowForm>>(null);

const isValid = ref(true);

const form = ref({
  name: "",
  address: "",
});

const rules = {
  name: [
    defineRule(require, "Поле обязательное"),
    defineRule(minLength(3), "Поле должно быть мин"),
  ],
};

onMounted(() => {
  formRef.value?.addError([
    defineError("name", "Тупая ошибка с сервера"),
    defineError("address", "Плохая ошибка"),
  ]);
});
</script>

<style></style>
