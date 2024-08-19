<template>
  <component :is="tag" v-if="errors?.[name]"> {{ errors?.[name] }} </component>
</template>

<script setup lang="ts">
import { withDefaults, defineProps } from "vue";
import injectForm from "@/compose/injectForm";

const { errors } = injectForm();

withDefaults(
  defineProps<{
    tag: "div" | "span";
    name: string;
  }>(),
  {
    tag: "span",
  }
);
</script>

<style scoped></style>
