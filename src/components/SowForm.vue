<template>
  <form>
    <slot :errors="errors" />
    {{ errors }}
  </form>
</template>

<script setup lang="ts">
import { ISowForm } from "@/interface/ISowForm";
import { provide, Ref, ref, computed } from "vue";
import { IField } from "@/interface/IField";
import { defineExpose } from "vue";
import { IError } from "@/interface/IError";

const fields: Ref<IField[]> = ref([]);

const errors = computed(() => {
  // Через reduce не хотело работать, не знаю в чем причина
  return Object.fromEntries(
    fields.value.filter((i) => i.name).map((i) => [i.name, i.invalidMessage])
  );
});

function registerField(field: IField) {
  fields.value.push(field);
  return fields.value.length;
}

function unregisterField(fieldKey: number) {
  fields.value = fields.value.filter((f) => f.key.value !== fieldKey);
}

function addError(payload: IError | IError[]) {
  const fn = (err: IError) => {
    const field = fields.value.find((f) => f.name === err.name);
    if (field) field.addServerError(err);
  };

  if (Array.isArray(payload)) payload.forEach((err) => fn(err));
  else fn(payload);
}

// function removeError(id: string) {}

defineExpose({
  addError,
});

const provideObject: ISowForm = {
  registerField,
  unregisterField,
  errors,
};

provide("sow-form", provideObject);
</script>

<style scoped></style>
