<template>
  <ModalAgreement />
  <ShopTable />
</template>

<script>
import { defineComponent } from "vue";
import ModalAgreement from "@/components/ModalAgreement.vue";
import ShopTable from "../components/Shop/ShopTable.vue";


export default defineComponent({
  name: "HomeView",
  components: {
    ModalAgreement,
    ShopTable,
  },
});
</script>

<style scoped></style>
