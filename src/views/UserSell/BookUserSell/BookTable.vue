<template>
  <AuthSell v-if="isLogin">
    <v-container fluid>
      <v-row>
        <v-col cols="12">
          <h2>หนังสือที่วางขาย</h2>
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="4">
          <v-card
            max-width="600"
            height="150"
            class="d-flex align-center justify-center"
          >
            <v-avatar class="bg-color mr-2">
              <v-icon>mdi-cart-outline</v-icon>
            </v-avatar>
            <span>ขายแล้ว {{ totalSold }} เล่ม</span></v-card
          >
        </v-col>
        <v-col cols="4">
          <v-card
            max-width="600"
            height="150"
            class="d-flex align-center justify-center"
          >
            <v-avatar class="bg-color mr-2">
              <v-icon>mdi-cash-multiple</v-icon>
            </v-avatar>
            <span>ยอดขายทั้งหมด {{ totalRevenue }} บาท</span>
          </v-card>
        </v-col>
        <v-col cols="4">
          <v-card
            max-width="600"
            height="150"
            class="d-flex align-center justify-center"
          >
            <v-avatar class="bg-color mr-2">
              <v-icon>mdi-book-open-page-variant </v-icon>
            </v-avatar>
            <span>หนังสือทั้งหมด {{ bookList.length }} เล่ม</span>
          </v-card>
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="6" class="text-start">
          <div class="select-width">
            <v-select
              density="compact"
              v-model="select"
              :items="selectItem"
              variant="outlined"
            ></v-select>
          </div>
        </v-col>
        <v-col cols="6" class="d-flex justify-end">
          <div>
            <v-btn color="blue-grey" class="mb-3" @click="addBook"
              >เพิ่มหนังสือ</v-btn
            >
          </div>
        </v-col>
      </v-row>

      <v-table v-if="bookList.length > 0" dense class="elevation-1">
        <thead class="table">
          <tr>
            <th class="text-left">
              <span class="text-color">วันเวลาที่เพิ่ม</span>
            </th>
            <th class="text-left">
              <span class="text-color">ชื่อหนังสือ</span>
            </th>
            <th class="text-left"><span class="text-color">ผู้แต่ง</span></th>
            <th class="text-left">
              <span class="text-color">สำนักพิมพ์</span>
            </th>
            <th class="text-left"><span class="text-color">หมวดหมู่</span></th>
            <th class="text-left"><span class="text-color">ราคา</span></th>
            <th class="text-left"><span class="text-color">ยอดขาย</span></th>
            <th class="text-left"><span class="text-color">เรตติ้ง</span></th>
            <th class="text-left"><span class="text-color">รูปภาพ</span></th>
            <th class="text-left"></th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(item, index) in bookList.slice(
              (page - 1) * itemsPerPage,
              page * itemsPerPage
            )"
            :key="index"
          >
            <td class="mt-2">{{ formatTime(item.createdAt) }}</td>
            <td class="ellipsis-one-line mt-2 text-xs-center">
              <span>{{ item.name }}</span>
            </td>
            <td class="mt-2 mb-2 text-xs-center">{{ item.author }}</td>
            <td class="mt-2 mb-2 text-xs-center">
              {{ item.publisher }}
            </td>
            <td class="mt-2 mb-2 text-xs-center">
              {{ item.category }}
            </td>
            <td class="mt-2 mb-2 text-xs-center">{{ item.price }} บาท</td>
            <td class="mt-2 mb-2 text-xs-center">{{ item.sold }} เล่ม</td>
            <td class="mt-2 mb-2 text-xs-center">{{ item.rating }}</td>
            <td class="text-xs-center">
              <v-avatar rounded="0" size="70">
                <v-img :src="item.imageBook" />
              </v-avatar>
            </td>
            <td class="d-flex mt-5 text-xs-center">
              <v-btn
                variant="flat"
                color="grey"
                class="mr-3"
                @click="showDetail(item)"
              >
                รายละเอียด
              </v-btn>
              <v-btn
                variant="flat"
                class="mr-3 btn-edit"
                @click="editBook(item)"
                >แก้ไข</v-btn
              >
              <v-btn
                variant="flat"
                color="error"
                @click="
                  showConfirm = true;
                  selectedBook = item;
                "
                >ลบ</v-btn
              >
            </td>
          </tr>
        </tbody>
      </v-table>
      <v-row v-else>
        <v-divider class="mt-3 mb-6"></v-divider>
        <v-col cols="12">
          <div class="d-flex justify-center">
            <img
              :src="'http://localhost:3000/uploads/notfoundicon.png'"
              width="200"
              height="200"
            />
          </div>
          <div class="text-noBook text-center">
            <p>ขออภัยด้วยนะครับ</p>
          </div>
          <div class="text-center mt-3">
            <p class="text-muted">ไม่พบข้อมูลในหัวข้อที่คุณกำลังชมค่ะ</p>
          </div>
        </v-col>
      </v-row>
      <v-row v-if="bookList.length > 0" class="mt-12">
        <v-col cols="12" class="pa-0">
          <v-pagination
            class="text-pagination"
            v-model="page"
            :length="pages"
            circle
          ></v-pagination>
        </v-col>
      </v-row>
      <v-dialog
        v-model="showConfirm"
        persistent
        :center="true"
        max-width="500"
        :padding="20"
      >
        <v-card>
          <v-card-title class="headline text-center">ยืนยันการลบ</v-card-title>
          <v-card-text class="text-center">
            คุณต้องการลบหนังสือ {{ selectedBook.name }} ใช่หรือไม่?
          </v-card-text>
          <v-card-actions class="text-center">
            <v-btn
              class="btn-confirm"
              @click="
                deleteBook(selectedBook);
                showConfirm = false;
              "
            >
              ลบ
            </v-btn>
            <v-btn class="btn-cancel" @click="showConfirm = false">
              ยกเลิก
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-container>
  </AuthSell>
  <AuthSell v-if="!isLogin"> </AuthSell>
</template>

<script>
import api from "@/services/api";
import AuthSell from "@/components/AuthSell.vue";
import moment from "moment";
import io from "socket.io-client";
import router from "@/router";

export default {
  components: {
    AuthSell,
  },
  data() {
    return {
      select: "หนังสือทั้งหมด",
      selectItem: ["หนังสือทั้งหมด", "การ์ตูนทั้งหมด", "นิยายทั้งหมด"],
      page: 1,
      itemsPerPage: 10,
      bookList: [],
      selectedBook: [],
      totalSold: 0,
      totalRevenue: 0,
      showConfirm: false,
      socket: null,
      socketioURL: "http://localhost:3000",
    };
  },
  methods: {
    getTotalSold() {
      api.get("/totalsolduser/" + this.getId()).then((result) => {
        this.totalSold = result.data.user.totalSold;
        this.totalRevenue = result.data.user.totalRevenue;
      });
    },
    showDetail(item) {
      router.push(`/detailbookusersell/${item._id}`).then(() => {
        window.scrollTo(0, 0);
      });
    },
    formatTime(item) {
      return moment(item).format("DD/MM/YYYY, HH:mm:ss");
    },
    async fetchApi() {
      try {
        const result = await api.get("/booksell/" + this.getId());
        this.bookList = result.data;
      } catch (error) {
        console.log(error);
      }
    },
    getId() {
      return this.$store.getters["auth/getId"];
    },
    getBooksCartoon() {
      api.get("/booksell/cartoon/" + this.getId()).then((result) => {
        this.bookList = result.data;
      });
    },
    getBooksNovel() {
      api.get("/booksell/novel/" + this.getId()).then((result) => {
        this.bookList = result.data;
      });
    },
    editBook(book) {
      router.push(`/booktable/${book._id}`).then(() => {
        window.scrollTo(0, 0);
      });
    },
    addBook() {
      router.push(`/newbook`).then(() => {
        window.scrollTo(0, 0);
      });
    },
    async deleteBook(book) {
      await api.delete("/books/" + book._id + "/" + this.getId());
      this.showAlert();
      this.fetchApi();
    },
    showAlert() {
      this.$swal({
        scrollbarPadding: false,
        confirmButtonColor: "#00af70",
        customClass: "show-modal",
        text: "ลบหนังสือสำเร็จ",
        icon: "success",
        allowOutsideClick: false,
        confirmButtonText: "OK",
      });
    },
  },
  computed: {
    pages() {
      return Math.ceil(this.bookList.length / this.itemsPerPage);
    },
    isLogin() {
      return this.$store.getters["auth/isLogin"];
    },
  },
  watch: {
    select(newValue) {
      if (newValue) {
        if (newValue === "หนังสือทั้งหมด") {
          this.fetchApi();
        } else if (newValue === "การ์ตูนทั้งหมด") {
          this.getBooksCartoon();
        } else if (newValue === "นิยายทั้งหมด") {
          this.getBooksNovel();
        }
      }
    },
  },
  async mounted() {
    if (!this.isLogin) {
      router.push("/").then(() => {
        window.scrollTo(0, 0);
      });
    } else if (this.isLogin) {
      const res = await api.get("/checkRoles/" + this.getId());
      if (!res.data.user.roles.includes("SELL")) {
        router.push("/").then(() => {
          window.scrollTo(0, 0);
        });
      } else {
        this.fetchApi();
        this.getTotalSold();
      }
    }
  },
  created() {
    this.socket = io(this.socketioURL, {
      transports: ["websocket", "polling"],
    });
    this.socket.on("product-sell", () => {
      if (this.isLogin) {
        this.fetchApi();
        this.getTotalSold();
      }
    });
    this.socket.on("update-book-edit", () => {
      if (this.isLogin) {
        this.fetchApi();
        this.getTotalSold();
      }
    });
    this.socket.on("update-book-delete", () => {
      if (this.isLogin) {
        this.fetchApi();
        this.getTotalSold();
      }
    });
    this.socket.on("upload-image-book", () => {
      if (this.isLogin) {
        this.fetchApi();
        this.getTotalSold();
      }
    });
    this.socket.on("upload-pdf-book", () => {
      if (this.isLogin) {
        this.fetchApi();
        this.getTotalSold();
      }
    });
    this.socket.on("requestbook-approved", () => {
      if (this.isLogin) {
        this.fetchApi();
        this.getTotalSold();
      }
    });
  },
};
</script>
<style>
.select-width {
  width: 200px;
}
.btn-confirm {
  color: #ffff;
  background-color: #b00020;
}
.btn-cancel {
  color: #ffff;
  background-color: #9e9e9e;
}
.btn-edit {
  color: #ffff;
  background-color: #00af70;
}
.table {
  background-color: #0008c1;
}
.ellipsis-one-line span {
  -webkit-line-clamp: 1;
}
.ellipsis-one-line span {
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
}

.ellipsis {
  position: relative;
}

.ellipsis:before {
  content: "&nbsp;";
  visibility: hidden;
}

.ellipsis span {
  position: absolute;
  left: 0;
  right: 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.text-center {
  display: flex;
  justify-content: center;
}
.text-color {
  color: #ffff;
}
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
