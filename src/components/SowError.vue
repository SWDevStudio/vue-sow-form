<template>
  <component :is="tag" v-if="errors?.[name]"> {{ errors?.[name] }} </component>
</template>

<script setup lang="ts">
import { withDefaults, defineProps } from "vue";
import useForm from "@/compose/useForm";

const { errors } = useForm();

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
