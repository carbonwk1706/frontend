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
            <v-btn
              color="success"
              rounded
              width="100"
              @click="buyProduct(book)"
            >
              ฿ {{ book.price }}
            </v-btn>
          </v-row>
          <br />
          <v-row>
            <v-btn icon v-if="wishStutas" color="white" @click="wishProcess">
              <v-icon>mdi-heart</v-icon>
            </v-btn>
            <v-btn icon v-else color="pink" @click="wishProcess">
              <v-icon>mdi-heart</v-icon>
            </v-btn>
          </v-row>
        </v-col>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import api from '@/services/api';

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
      wishStutas: true,
    };
  },
  methods: {
    wishProcess() {
      this.wishStutas = !this.wishStutas;
    },
    buyProduct(item) {
      console.log(item._id);
      console.log(this.$store.getters["auth/getId"]);
      const newCart = [item._id, this.$store.getters["auth/getId"]];
      console.log(newCart);
      axios
        .post("http://localhost:3000/cart/", newCart)
        .then((response) => console.log(JSON.parse(JSON.stringify(response))))
        .catch((error) => console.log(error));
    },
  },
  mounted() {
    api
      .get("/books/" + this.$route.params.id)
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
