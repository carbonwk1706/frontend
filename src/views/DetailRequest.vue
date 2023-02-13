<template>
  <v-container>
    <v-row>
      <v-col cols="12" sm="6">
        <v-card>
          <v-card-text>
            <p> ID :{{ request._id }}</p>
            <p>{{ request.request }}</p>
            <p>{{ request.status }}</p>
            <p>{{ request.address }}</p>
            <p>{{ request.bankAccount }}</p>
            <p>{{ request.district }}</p>
            <p>{{ request.idAccount }}</p>
            <p>{{ request.idCard }}</p>
            <p>{{ request.firstName }}</p>
            <p>{{ request.lastName }}</p>
            <p>{{ request.phone }}</p>
            <p>{{ request.postCode }}</p>
            <p>{{ request.province }}</p>
            <p>{{ request.publisher }}</p>
            <p>{{ request.road }}</p>
            <p>{{ request.subDistrict }}</p>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
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
