<template>
  <div>
    <SowForm>
      <SowError name="name"></SowError>
      <TField v-model="form.name" :rules="rules.name" name="name" />
    </SowForm>
  </div>
</template>

<script lang="ts" setup>
import SowForm from "@/components/SowForm.vue";
import TField from "@/test-components/TField.vue";
import { ref } from "vue";
import defineRule from "@/utils/defineRule";
import { minLength, require } from "@/rules";
import SowError from "@/components/SowError.vue";

const form = ref({
  name: "",
});

const rules = {
  name: [
    defineRule(require, "Поле обязательное"),
    defineRule(minLength(3), "Поле должно быть мин"),
  ],
};
</script>

<style></style>
