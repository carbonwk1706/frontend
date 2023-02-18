<template>
  <AuthCart>
    <CartList />
  </AuthCart>
</template>
<script>
import AuthCart from "../../components/AuthCart.vue";
import CartList from "@/components/Shop/CartList.vue";

export default {
  components: {
    AuthCart,
    CartList,
  },
};
</script>
<style scoped></style>
