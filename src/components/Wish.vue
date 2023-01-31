<template>
  <v-container class="grey lighten-5">
    <div class="mb-5 d-flex justify-start">
      <h1>รายการที่อยากได้</h1>
    </div>
    <hr class="mb-6" />
    <v-row>
      <v-col v-for="(item, index) in wishList" :key="index">
        <v-card class="mx-auto" max-width="180" @click="showDetail(item)">
          <v-img :src="item.imageBook" height="250px"></v-img>
          <v-card-title> {{ item.name }} </v-card-title>
          <v-card-subtitle>
            {{ item.author }}/{{ item.publisher }}
          </v-card-subtitle>
          <v-row class="d-flex justify-end ma-3">
            <v-btn color="success" @click="addItem(item)">
              ฿ {{ item.price }}
            </v-btn>
          </v-row>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import api from "@/services/api";

export default {
  name: "Wish",
  data() {
    return {
      wishList: [],
    };
  },
  mounted() {
    api.get("/books/").then((result) => {
      console.log(result);
      this.wishList = result.data;
    });
  },
};
</script>

<style></style>
