<template>
  <h1 class="text-center">Home</h1>
  <MoldalAgreement />
</template>

<script>
import { defineComponent } from "vue";
import MoldalAgreement from "@/components/MoldalAgreement.vue";

export default defineComponent({
  name: "HomeView",
  components: {
    MoldalAgreement,
  },
});
</script>

<style scoped></style>
