<template>
  <div class="mb-5">
    <h1>Header</h1>
    <hr />
  </div>
  <v-container class="grey lighten-5">
    <v-row no-gutters>
      <v-col v-for="(item, index) in books" :key="index">
        <v-card class="mx-auto" max-width="180">
          <v-img :src="item.image" height="250px"></v-img>
          <v-card-title> {{ item.name }} </v-card-title>

          <v-card-subtitle>
            {{ item.author }}/{{ item.publisher }}
          </v-card-subtitle>
          <v-row class="d-flex justify-end ma-3">
            <v-btn color="success"> ฿ {{ item.price }} </v-btn>
          </v-row>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "ShopTable",
  data() {
    return {
      books: [
        {
          id: "1",
          name: "book1",
          author: "name1",
          publisher: "name1",
          category: "type1",
          price: 100,
          image:
            "https://cdn-local.mebmarket.com/meb/server1/225386/Thumbnail/web_large2.gif?2",
        },
        {
          id: "2",
          name: "book2",
          author: "name1",
          publisher: "name1",
          category: "type1",
          price: 100,
          image:
            "https://cdn-local.mebmarket.com/meb/server1/225386/Thumbnail/web_large2.gif?2",
        },
        {
          id: "3",
          name: "book3",
          author: "name1",
          publisher: "name1",
          category: "type1",
          price: 100,
          image:
            "https://cdn-local.mebmarket.com/meb/server1/225386/Thumbnail/web_large2.gif?2",
        },
        {
          id: "4",
          name: "book4",
          author: "name1",
          publisher: "name1",
          category: "type1",
          price: 100,
          image:
            "https://cdn-local.mebmarket.com/meb/server1/225386/Thumbnail/web_large2.gif?2",
        },
        {
          id: "5",
          name: "book5",
          author: "name1",
          publisher: "name1",
          category: "type1",
          price: 100,
          image:
            "https://cdn-local.mebmarket.com/meb/server1/225386/Thumbnail/web_large2.gif?2",
        },
      ],
    };
  },
};
</script>

<style></style>
