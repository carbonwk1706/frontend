<template>
  <h1 class="text-center">Home</h1>
  <ModalAgreement />
</template>

<script>
import { defineComponent } from "vue";
import ModalAgreement from "@/components/ModalAgreement.vue";

export default defineComponent({
  name: "HomeView",
  components: {
    ModalAgreement,
  }
});
</script>

<style scoped></style>
