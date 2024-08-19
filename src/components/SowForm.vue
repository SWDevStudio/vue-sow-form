<template>
  <form>
    <slot :isValid="isValid" />
  </form>
</template>

<script setup lang="ts">
import { ISowForm } from "@/interface/ISowForm";
import { provide, Ref, ref } from "vue";
import { IField } from "@/interface/IField";
import { defineExpose, defineEmits } from "vue";
import { IError } from "@/interface/IError";

const fields: Ref<IField[]> = ref([]);

// field

function registerField(field: IField) {
  fields.value.push(field);
  checkValid();
  return fields.value.length;
}

function unregisterField(fieldKey: number) {
  fields.value = fields.value.filter((f) => f.key.value !== fieldKey);
  checkValid();
}

// error

function addError(payload: IError | IError[]) {
  const fn = (err: IError) => {
    const field = fields.value.find((f) => f.name === err.name);
    if (field) field.addServerError(err);
  };

  if (Array.isArray(payload)) payload.forEach((err) => fn(err));
  else fn(payload);
}

// valid

const isValid = ref(false);
const emit = defineEmits(["update:isValid"]);
function checkValid() {
  isValid.value = fields.value.every((item) => item.isValid);
  emit("update:isValid", isValid.value);
}

defineExpose({
  addError,
});

const provideObject: ISowForm = {
  registerField,
  unregisterField,
  checkValid,
  fields,
  isValid,
};

provide("sow-form", provideObject);
</script>

<style scoped></style>
