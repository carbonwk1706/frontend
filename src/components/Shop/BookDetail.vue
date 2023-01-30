<template>
  <v-container>
    <div class="herdName">{{ book.name }}</div>
    <v-row>
      <v-col class="d-flex justify-end">
        <v-img :src="book.imageBook" max-height="360" max-width="360" />
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
              @click="addProduct(book)"
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
      book: [],
      wishStutas: true,
    };
  },
  methods: {
    wishProcess() {
      this.wishStutas = !this.wishStutas;
    },
    addProduct(item) {
      this.$store.dispatch('addItemToCart', item)
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
