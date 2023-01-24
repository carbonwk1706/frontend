<template>
  <v-container>
    <div class="herdName">{{ book.name }}</div>
    <v-row>
      <v-col class="d-flex justify-end">
        <v-img :src="book.imageBook" max-height="500" max-width="500" />
      </v-col>
      <v-col class="description">
        <v-col>
          <v-row>โดย {{ book.author }}</v-row>
          <br />
          <v-row>สำนักพิมพ์ {{ book.publisher }}</v-row>
          <br />
          <v-row>หมวดหมู่ {{ book.category }}</v-row>
          <br />
          <v-row>
            <v-btn color="success" rounded width="100">
              ฿ {{ book.price }}
            </v-btn>
          </v-row>
          <br />
          <v-row>

            <v-btn icon color="white" @click="wishProcess()">
              <v-icon>mdi-heart</v-icon>
            </v-btn>

          </v-row>
        </v-col>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import axios from "axios";

export default {
  name: "BookDetail",
  data() {
    return {
      book: {
        name: "",
        auther: "",
        publisher: "",
        catagory: "",
        price: "",
        imgaeBook: null,
      },
    };
  },
  methods: {
    wishProcess() {
      
    },
  },
  mounted() {
    axios
      .get("http://localhost:3000/books/" + this.$route.params.id)
      .then((result) => {
        console.log(JSON.parse(JSON.stringify(result)));
        this.book = result.data;
      });
  },
};
</script>

<style scoped>
.herdName {
  display: flex;
  justify-content: center;
  margin-bottom: 30px;
  font-size: 36px;
  font-weight: bold;
}

.description {
  font-size: 20px;
  font-weight: 500;
  margin-bottom: 30px;
}
</style>
