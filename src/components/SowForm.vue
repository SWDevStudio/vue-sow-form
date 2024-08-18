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

const provideObject: ISowForm = {
  registerField,
  unregisterField,
  errors,
};

provide("sow-form", provideObject);
</script>

<style scoped></style>
