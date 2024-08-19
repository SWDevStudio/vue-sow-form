<template>
  <div>
    <!--    <SowForm ref="formRef" id="form-one">-->
    <!--      <div>Форма один</div>-->
    <!--      <TField v-model="form.name" :rules="rules.name" name="name" />-->
    <!--      <TField v-model="form.address" :rules="rules.name" name="address" />-->
    <!--    </SowForm>-->

    <div>DIVIDER</div>

    <SowForm id="form-two" ref="formRef">
      <TField v-model="formTwo.user" name="name" />
      <TField v-model="formTwo.count" :rules="rules.name" />
    </SowForm>

    <TField v-model="formTwo.data" form-id="form-two" name="kek" />
  </div>
</template>

<script lang="ts" setup>
import SowForm from "@/components/SowForm.vue";
import TField from "@/test-components/TField.vue";
import { onMounted, ref } from "vue";
import defineRule from "@/utils/defineRule";
import { minLength, require } from "@/rules";
import { ComponentExposed } from "vue-component-type-helpers";
import { defineError } from "@/index";

const formRef = ref<ComponentExposed<typeof SowForm>>(null);

const formTwo = ref({
  user: "",
  count: "",
  data: "",
});

const rules = {
  name: [
    defineRule(require, "Поле обязательное"),
    defineRule(minLength(3), "Поле должно быть мин"),
  ],
};

onMounted(() => {
  setTimeout(() => {
    formRef.value?.addError([defineError("name", "Тупая ошибка с сервера")]);
  }, 2000);
});
</script>

<style></style>
