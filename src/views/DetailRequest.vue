<template>
  <div>{{ request._id }}</div>
  <div>{{ request.request }}</div>
  <div>{{ request.status }}</div>
  <div>{{ request.address }}</div>
  <div>{{ request.bankAccount }}</div>
  <div>{{ request.district }}</div>
  <div>{{ request.idAccount }}</div>
  <div>{{ request.idCard
  }}</div>
  <div>{{ request.firstName }}</div>
  <div>{{ request.lastName }}</div>
  <div>{{ request.phone }}</div>
  <div>{{ request.postCode }}</div>
  <div>{{ request.province }}</div>
  <div>{{ request.publisher }}</div>
  <div>{{ request.road }}</div>
  <div>{{ request.subDistrict  }}</div>
</template>
<script>
import api from "@/services/api";
export default {
  data() {
    return {
      request: [],
    };
  },
  mounted() {
    api.get("/request/" + this.$route.params.id).then((result) => {
      this.request = result.data.request;
      console.log(this.request);
    });
  },
};
</script>
<style lang=""></style>
