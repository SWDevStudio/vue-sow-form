<template>
  <form>
    <slot />
  </form>
</template>

<script setup lang="ts">
import { ISowForm } from "@/interface/ISowForm";
import { provide, Ref, ref } from "vue";
import { IField } from "@/interface/IField";

const fields: Ref<IField[]> = ref([]);

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
};

provide("sow-form", provideObject);
</script>

<style scoped></style>
