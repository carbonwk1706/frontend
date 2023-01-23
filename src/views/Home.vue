<template>
  <h1 class="text-center">Home</h1>
  <ModalAgreement />
  <ShopTable />
</template>

<script>
import { defineComponent } from "vue";
import ModalAgreement from "@/components/ModalAgreement.vue";
import ShopTable from "../components/Shop/ShopTable.vue";

// Components

export default defineComponent({
  name: "HomeView",
  components: {
    ModalAgreement,
  }
    ShopTable,
  },
});
</script>

<style scoped></style>
