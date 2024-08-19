<template>
  <form :id="id">
    <slot :errors="errors" />
    {{ errors }}

    Оно валидно: {{ isValid }}
  </form>
</template>

<script setup lang="ts">
import { defineProps } from "vue";
import { defineExpose } from "vue";
import useForm from "@/compose/useForm";

const props = defineProps<{
  id?: string;
}>();

const { addError, errors, isValid, fields } = useForm({ formId: props.id });

defineExpose({
  addError,
});
</script>

<style scoped></style>
