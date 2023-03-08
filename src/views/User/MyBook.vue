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
      <v-row class="mt-3">
        <v-col col="12" class="pl-0">
          <span>กรุณากรอกคำที่คุณต้องการค้นหา</span>
        </v-col>
      </v-row>
      <v-row>
        <div class="select-width mr-2">
          <v-select
            density="compact"
            v-model="search"
            :items="searchItem"
            variant="outlined"
          ></v-select>
        </div>
        <div class="search-width">
          <v-text-field
            :loading="loadingSearch"
            density="compact"
            variant="outlined"
            v-model="searchTerm"
            single-line
            append-inner-icon="mdi-magnify"
            @click:append-inner="searchBook"
            @keyup.enter="searchBook"
          ></v-text-field>
        </div>
      </v-row>
      <v-row class="mb-1">
        <v-col cols="12" class="text-start">
          <h2 class="font-weight-bold">ชั้นหนังสือของฉัน</h2>
        </v-col>
      </v-row>
      <v-divider class="mb-6"></v-divider>
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
        <v-row>
          <v-col
            v-for="(item, index) in myBook.slice(
              (page - 1) * itemsPerPage,
              page * itemsPerPage
            )"
            :key="index"
            md="3"
            sm="4"
            xs="6"
          >
            <v-card
              max-width="200"
              class="mx-auto cardHover"
              @click="showDetail(item)"
            >
              <v-img :src="item.imageBook" height="280px" cover />
              <v-card-title class="text-center pb-0" style="font-size: 15px">{{
                item.name
              }}</v-card-title>
              <v-card-subtitle
                class="text-center grey--text"
                style="font-size: 12px"
              >
                {{ item.author }} / {{ item.publisher }}
              </v-card-subtitle>
              <v-card-text
                class="text-center pb-0 pt-0"
                style="font-size: 13px"
              >
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
                <v-btn disabled class="btn-color">มีแล้ว</v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>

        <v-row class="mt-12">
          <v-col cols="12" class="pa-0">
            <v-pagination
              class="text-pagination"
              v-model="page"
              :length="pages"
              circle
            ></v-pagination>
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
import io from "socket.io-client";

export default {
  components: {
    Auth,
  },
  data() {
    return {
      myBook: [],
      cartList: [],
      searchItem: ["ค้นจากชื่อเรื่อง", "ค้นจากผู้แต่ง", "ค้นจากสำนักพิมพ์"],
      search: "ค้นจากชื่อเรื่อง",
      page: 1,
      itemsPerPage: 40,
      searchTerm: "",
      loadingSearch: false,
      socket: null,
      socketioURL: "http://localhost:3000",
    };
  },
  methods: {
    async searchBook() {
      this.loadingSearch = true;
      if (!this.searchTerm) {
        setTimeout(() => {
          this.loadingSearch = false;
          this.getMyBook();
        }, 1000);
      } else {
        if (this.search === "ค้นจากชื่อเรื่อง") {
          setTimeout(() => {
            this.loadingSearch = false;
            this.matchBooks("name/");
          }, 1000);
        } else if (this.search === "ค้นจากผู้แต่ง") {
          setTimeout(() => {
            this.loadingSearch = false;
            this.matchBooks("author/");
          }, 1000);
        } else if (this.search === "ค้นจากสำนักพิมพ์") {
          setTimeout(() => {
            this.loadingSearch = false;
            this.matchBooks("publisher/");
          }, 1000);
        }
      }
    },
    async matchBooks(path) {
      const res = await api.get("/searchbook/inventory/" + path, {
        params: {
          searchTerm: this.searchTerm,
          userId: this.getId(),
        },
      });

      this.myBook = res.data;
    },
    goToProfile() {
      router.push("/profile").then(() => {
        window.scrollTo(0, 0);
      });
    },
    async getMyBook() {
      const res = await api.get("/inventory/" + this.getId());
      this.myBook = res.data;
    },
    showDetail(item) {
      router.push(`/book/${item._id}`).then(() => {
        window.scrollTo(0, 0);
      });
    },
    getId() {
      return this.$store.getters["auth/getId"];
    },
  },
  computed: {
    isLogin() {
      return this.$store.getters["auth/isLogin"];
    },
    pages() {
      return Math.ceil(this.myBook.length / this.itemsPerPage);
    },
  },
  mounted() {
    if (this.isLogin) {
      this.getMyBook();
    }
  },
  async created() {
    this.socket = io(this.socketioURL, {
      transports: ["websocket", "polling"],
    });
    this.socket.on("new-rating", () => {
      if (this.isLogin) {
        this.getMyBook();
      }
    });
    this.socket.on("update-book-edit", () => {
      if (this.isLogin) {
        this.getMyBook();
      }
    });
    this.socket.on("update-book-delete", () => {
      if (this.isLogin) {
        this.getMyBook();
      }
    });
    this.socket.on("upload-image-book", () => {
      if (this.isLogin) {
        this.getMyBook();
      }
    });
    this.socket.on("upload-pdf-book", () => {
      if (this.isLogin) {
        this.getMyBook();
      }
    });
  },
};
</script>

<style scoped>
.search-width {
  width: 200px;
}
.select-width {
  width: 190px;
}
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
