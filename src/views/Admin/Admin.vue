<template>
  <div>
    <v-row>
      <v-col cols="3">
        <v-card
          max-width="300"
          height="150"
          class="d-flex align-center justify-center"
        >
          <v-avatar class="bg-color mr-2">
            <v-icon>mdi-cart-outline</v-icon>
          </v-avatar>
          <span>ขายแล้ว {{ totalSold }} เล่ม</span></v-card
        >
      </v-col>
      <v-col cols="3">
        <v-card
          max-width="300"
          height="150"
          class="d-flex align-center justify-center"
        >
          <v-avatar class="bg-color mr-2">
            <v-icon>mdi-cash-multiple</v-icon>
          </v-avatar>
          <span>ยอดขายทั้งหมด {{ totalRevenue }} บาท</span>
        </v-card>
      </v-col>
      <v-col cols="3">
        <v-card
          max-width="300"
          height="150"
          class="d-flex align-center justify-center"
        >
          <v-avatar color="warning" class="mr-2">
            <v-icon>mdi-account-check</v-icon>
          </v-avatar>
          <span>
            คำร้องที่รอการอนุมัติ {{ request.length }} รายการ
          </span></v-card
        >
      </v-col>
      <v-col cols="3">
        <v-card
          max-width="300"
          height="150"
          class="d-flex align-center justify-center"
        >
          <v-avatar color="info" class="mr-2">
            <v-icon>mdi-account</v-icon>
          </v-avatar>
          <span>จำนวนผู้ใช้งาน {{ user.length }} คน</span></v-card
        >
      </v-col>
    </v-row>
  </div>
  <div v-if="bestseller.length > 0" id="bestseller" class="rounded border mt-5">
    <v-row>
      <v-col class="text-center">
        <h2 class="display-1 font-weight-bold bg-color">EBOOK ขายดี</h2>
      </v-col>
    </v-row>
    <v-divider class="mb-6"></v-divider>
    <v-row>
      <v-col
        v-for="(item, index) in filteredBestSell"
        :key="index"
        class="mb-5"
        md="3"
        sm="4"
        xs="6"
      >
        <v-card max-width="200" class="mx-auto cardHover">
          <v-img :src="item.imageBook" height="280px" cover>
            <v-img
              src="https://www.mebmarket.com/web/dist/assets/images/book-badge-B@2x.png"
              width="35"
              height="55"
              class="position-absolute"
              style="right: 0"
            ></v-img>
          </v-img>
          <v-card-title class="text-center pb-0" style="font-size: 15px">{{
            item.name
          }}</v-card-title>
          <v-card-subtitle
            class="text-center grey--text"
            style="font-size: 12px"
          >
            {{ item.author }} / {{ item.publisher }}
          </v-card-subtitle>
          <v-card-text class="text-center pb-0 pt-0" style="font-size: 13px">
            <div style="display: inline-block; vertical-align: middle">
              <v-rating
                v-model="item.rating"
                color="#5a5a5a"
                active-color="#e83e8c"
                empty-icon="mdi-cards-heart"
                full-icon="mdi-cards-heart"
                readonly
                hover
                size="16"
              />
            </div>
            <span
              class="ml-2 text-grey-lighten-1 text-caption"
              style="display: inline-block; vertical-align: middle"
            >
              ({{ item.ratingsCount }} Rating)
            </span>
          </v-card-text>
          <v-card-actions class="justify-center">
            <v-btn class="btn-color">ยอดขาย {{ item.sold }} เล่ม </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </div>
  <div v-else class="rounded border mt-5 pa-3">
    <h2 class="text-center">ยังไม่มีรายการขายดี</h2>
  </div>
</template>
<script>
import router from "@/router";
import api from "@/services/api";
import io from "socket.io-client";
export default {
  data() {
    return {
      bestseller: [],
      totalSold: 0,
      totalRevenue: 0,
      request: [],
      user: [],
      socket: null,
      socketioURL: "http://localhost:3000",
    };
  },
  methods: {
    getBestseller() {
      api.get("/bestseller/").then((result) => {
        this.bestseller = result.data;
      });
    },
    getTotalSold() {
      api.get("/totalsold/").then((result) => {
        this.totalSold = result.data.totalSold;
        this.totalRevenue = result.data.totalRevenue;
      });
    },
    async getRequest() {
      try {
        const res = await api.get("/allrequest");
        this.request = res.data.combinedData;
      } catch (error) {
        console.log(error);
      }
    },
    async getUser() {
      try {
        const res = await api.get("/findUser");
        this.user = res.data.users;
      } catch (error) {
        console.log(error);
      }
    },
    getId() {
      return this.$store.getters["authAdmin/getId"];
    },
  },
  computed: {
    filteredBestSell() {
      return this.bestseller.slice(0, 4);
    },
    isLogin() {
      return this.$store.getters["authAdmin/isLogin"];
    },
  },
  async mounted() {
    if (!this.isLogin) {
      router.push("/login").then(() => {
        window.scrollTo(0, 0);
      });
    } else if (this.isLogin) {
      const res = await api.get("/checkRoles/" + this.getId());
      if (!res.data.user.roles.includes("LOCAL_ADMIN")) {
        router.push("/admintable").then(() => {
          window.scrollTo(0, 0);
        });
      } else {
        this.getBestseller();
        this.getTotalSold();
        this.getRequest();
        this.getUser();
      }
    }
  },
  created() {
    this.socket = io(this.socketioURL, {
      transports: ["websocket", "polling"],
    });

    this.socket.on("new-request-payment", () => {
      if (this.isLogin) {
        this.getRequest();
      }
    });
    this.socket.on("new-user", () => {
      if (this.isLogin) {
        this.getUser();
      }
    });
    this.socket.on("add-new", () => {
      if (this.isLogin) {
        this.getUser();
      }
    });
    this.socket.on("delete-user", () => {
      if (this.isLogin) {
        this.getUser();
      }
    });
    this.socket.on("new-request-book", () => {
      if (this.isLogin) {
        this.getRequest();
      }
    });
    this.socket.on("new-receipt", () => {
      if (this.isLogin) {
        this.getRequest();
      }
    });
    this.socket.on("new-request", () => {
      if (this.isLogin) {
        this.getRequest();
      }
    });
    this.socket.on("product-sell", () => {
      if (this.isLogin) {
        this.getTotalSold();
      }
    });
    this.socket.on("update-book-edit", () => {
      if (this.isLogin) {
        this.getTotalSold();
        this.getBestseller();
      }
    });
    this.socket.on("update-book-delete", () => {
      if (this.isLogin) {
        this.getBestseller();
        this.getTotalSold();
      }
    });
    this.socket.on("upload-image-book", () => {
      if (this.isLogin) {
        this.getTotalSold();
        this.getBestseller();
      }
    });
    this.socket.on("upload-pdf-book", () => {
      if (this.isLogin) {
        this.getBestseller();
        this.getTotalSold();
      }
    });
  },
};
</script>
<style scoped>
.btn-color {
  color: #fff;
  background-color: #0008c1;
}
.cardHover:hover {
  border: 1px solid #0008c1;
  cursor: pointer;
}
.bg-color {
  color: #ffff;
  background-color: #0008c1;
}
</style>
