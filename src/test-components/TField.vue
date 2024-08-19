<template>
  <div class="t-field">
    <input v-model="innerValue" :placeholder="name" />
    <!--    <div v-if="invalidMessage">{{ invalidMessage }}</div>-->
  </div>
</template>

<script setup lang="ts">
import { computed, defineProps, defineEmits, withDefaults } from "vue";
import useField from "@/compose/useField";
import { IFormRule } from "@/interface/IFormRule";

const props = withDefaults(
  defineProps<{
    modelValue: string;
    rules?: IFormRule[];
    name?: string;
    formId?: string;
  }>(),
  {
    rules: () => [],
  }
);
const emit = defineEmits(["update:modelValue"]);

const innerValue = computed({
  get() {
    return props.modelValue;
  },
  set(v: string) {
    emit("update:modelValue", v);
  },
});

const { invalidMessage } = useField({
  modelValue: innerValue,
  rules: props.rules || [],
  name: props.name,
});
</script>

<style scoped></style>
