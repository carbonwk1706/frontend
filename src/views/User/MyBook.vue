<template>
  <Auth v-if="isLogin">
    <v-container fluid>
      <div class="d-flex align-center">
        <span class="menu-link" @click="goToProfile">จัดการบัญชี</span>
        <v-icon>mdi-chevron-right</v-icon>
        <span class="menu-link-current">ชั้นหนังสือของฉัน</span>
      </div>
      <div class="mt-6 mb-5 text-center">
        <h1>ชั้นหนังสือของฉัน</h1>
      </div>
      <template v-if="myBook.length === 0 || myBook === null">
        <div class="d-flex justify-center">
          <img
            src="https://www.mebmarket.com/web/dist/assets/images/imgMebcatMebphone@2x.png"
            width="200"
            height="200"
          />
        </div>
        <div class="text-noBook text-center">
          <p>ยังไม่มีหนังสือในชั้นหนังสือ</p>
        </div>
        <div class="text-center mt-3">
          <p class="text-muted">ไม่พบข้อมูลในหัวข้อที่คุณกำลังชมค่ะ</p>
        </div>
      </template>
      <template v-else>
        <v-row class="mb-3">
          <v-col class="text-text-start">
            <h3 class="display-1 font-weight-bold">ชั้นหนังสือของฉัน</h3>
          </v-col>
        </v-row>
        <v-divider class="mb-6"></v-divider>
        <v-row>
          <v-col
            v-for="(item, index) in myBook"
            :key="index"
            cols="12"
            sm="6"
            md="4"
            class="mb-5"
          >
            <v-card class="cardHover" max-width="200" @click="showDetail(item)">
              <v-img :src="item.imageBook" cover></v-img>
              <v-card-title class="text-center">{{ item.name }}</v-card-title>
              <v-card-subtitle class="text-center grey--text">
                {{ item.author }} / {{ item.publisher }}
              </v-card-subtitle>
              <v-divider></v-divider>
              <v-card-text class="text-center">
                <v-rating
                  v-model="item.rating"
                  color="#5a5a5a"
                  active-color="#e83e8c"
                  empty-icon="mdi-cards-heart"
                  full-icon="mdi-cards-heart"
                  readonly
                  hover
                  size="20"
                ></v-rating>
                <span class="text-grey-lighten-1 text-caption">
                  ({{ item.ratingsCount }} Rating)
                </span>
              </v-card-text>
              <v-card-actions class="justify-center">
                <v-btn disabled class="btn-color">มีแล้ว</v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </template>
    </v-container>
  </Auth>

  <Auth v-if="!isLogin"></Auth>
</template>

<script>
import api from "@/services/api";
import router from "@/router";
import Auth from "@/components/Auth.vue";

export default {
  components: {
    Auth,
  },
  data() {
    return {
      myBook: [],
      cartList: [],
    };
  },
  methods: {
    goToProfile() {
      router.push("/profile");
    },
    async getMyBook() {
      const res = await api.get("/inventory/" + this.getId());
      this.myBook = res.data;
    },
    showDetail(item) {
      this.$router.push(`/book/${item._id}`);
    },
    getId() {
      return this.$store.getters["auth/getId"];
    },
    getCartList() {
      api.get("/cart/" + this.getId()).then((result) => {
        this.cartList = result.data.items;
        this.$store.dispatch("cartList/setCartList", this.cartList);
      });
    },
  },
  computed: {
    isLogin() {
      return this.$store.getters["auth/isLogin"];
    },
  },
  mounted() {
    if (this.isLogin) {
      this.getMyBook();
      this.getCartList();
    }
  },
};
</script>

<style scoped>
.btn-color {
  color: #fff;
  background-color: #00af70;
}
.text-noBook {
  font-size: 18px;
  font-weight: bold;
}
.close-button {
  display: flex;
  color: gray;
  background-color: white;
  border-radius: 50%;
  position: absolute;
  right: 0px;
  top: 0px;
}
.v-btn.success:hover {
  background-color: gray !important;
}
.menu-link {
  color: #5a5a5a;
  font-size: 14px;
  cursor: pointer;
}
.menu-link-current {
  color: #5a5a5a;
  font-size: 14px;
}
</style>
