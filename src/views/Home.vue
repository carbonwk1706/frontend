<template>
  <ShopTable />
</template>

<script>
import { defineComponent } from "vue";
import ShopTable from "../components/Shop/ShopTable.vue";

// Components

export default defineComponent({
  name: "HomeView",
  components: {
    ShopTable,
  },
});
</script>
