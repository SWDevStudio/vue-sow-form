<template>
  <div>
    <TField v-model="f.a" name="name" />
    <TField v-model="f.b" />
  </div>
</template>

<script setup lang="ts">
import TField from "@/test-components/TField.vue";
import { ref } from "vue";

const f = ref({
  a: "",
  b: "",
});
</script>

<style scoped></style>
