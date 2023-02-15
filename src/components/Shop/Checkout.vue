<template>
  <h1 class="text-center mt-6"> ชำระเงิน </h1>
</template>
<script>
import api from '@/services/api';
export default {
  methods:{
    async checkout() {
      const res = await api.post("/checkout/", {
        userId: this.getId(),
        items: this.cartList,
      });
      if (res.status === 201 && res.data.message === "not enough money") {
        console.log("เงินไม่พอจ้า");
      } else {
        console.log("ซื้อได้แล้วจ้า");
      }
    },
  }
}
</script>
<style>
  
</style>