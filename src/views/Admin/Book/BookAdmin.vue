<template>
  <v-container fluid>
    <v-row>
      <v-col cols="12">
        <h2>หนังสือที่วางขาย</h2>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" class="text-start">
        <div class="select-width">
          <v-select
            density="compact"
            v-model="select"
            :items="selectItem"
            variant="outlined"
          ></v-select>
        </div>
      </v-col>
    </v-row>

    <div class="d-flex justify-end">
      <v-btn color="blue-grey" class="mb-3" @click="addBook"
        >เพิ่มหนังสือ</v-btn
      >
    </div>

    <v-table v-if="bookList.length > 0" dense class="elevation-1">
      <thead class="table">
        <tr>
          <th class="text-left">
            <span class="text-color">วันเวลาที่เพิ่ม</span>
          </th>
          <th class="text-left"><span class="text-color">ชื่อหนังสือ</span></th>
          <th class="text-left"><span class="text-color">ผู้แต่ง</span></th>
          <th class="text-left"><span class="text-color">สำนักพิมพ์</span></th>
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
          <td class="ellipsis-one-line mt-2">
            <span>{{ item.name }}</span>
          </td>
          <td class="mt-2">{{ item.author }}</td>
          <td class="mt-2">{{ item.publisher }}</td>
          <td class="mt-2">{{ item.category }}</td>
          <td class="mt-2">{{ item.price }} บาท</td>
          <td class="mt-2">{{ item.sold }} เล่ม</td>
          <td class="mt-2">{{ item.rating }}</td>
          <td class="text-xs-center mt-2">
            <v-avatar rounded="0" size="70">
              <v-img :src="item.imageBook" />
            </v-avatar>
          </td>
          <td class="d-flex justify-center mt-5">
            <v-btn
              variant="flat"
              color="grey"
              class="mr-3"
              @click="showDetail(item)"
            >
              รายละเอียด
            </v-btn>
            <v-btn variant="flat" class="mr-3 btn-edit" @click="editBook(item)"
              >แก้ไข</v-btn
            >
            <v-btn
              variant="flat"
              color="error"
              class="mr-3"
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
          <v-btn  class="btn-cancel" @click="showConfirm = false"> ยกเลิก </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
import api from "@/services/api";
import router from "@/router";
import moment from "moment";
import io from "socket.io-client";
export default {
  data() {
    return {
      select: "หนังสือทั้งหมด",
      selectItem: ["หนังสือทั้งหมด", "การ์ตูนทั้งหมด", "นิยายทั้งหมด"],
      page: 1,
      itemsPerPage: 10,
      bookList: [],
      selectedBook: [],
      showConfirm: false,
      socket: null,
      socketioURL: "http://localhost:3000",
    };
  },
  methods: {
    formatTime(item) {
      return moment(item).format("DD/MM/YYYY, HH:mm:ss");
    },
    async fetchApi() {
      try {
        const result = await api.get("/books/all");
        this.bookList = result.data;
      } catch (error) {
        console.log(error);
      }
    },
    showDetail(item) {
      router.push(`/detailbookadmin/${item._id}`).then(() => {
        window.scrollTo(0, 0);
      });
    },
    getBooksCartoon() {
      api.get("/books/cartoon").then((result) => {
        this.bookList = result.data;
      });
    },
    getBooksNovel() {
      api.get("/books/novel").then((result) => {
        this.bookList = result.data;
      });
    },
    editBook(book) {
      router.push(`/bookadmin/${book._id}`).then(() => {
        window.scrollTo(0, 0);
      });
    },
    addBook() {
      router.push(`/newbookadmin`).then(() => {
        window.scrollTo(0, 0);
      });
    },
    getId() {
      return this.$store.getters["authAdmin/getId"];
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
      return this.$store.getters["authAdmin/isLogin"];
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
      router.push("/login").then(() => {
        window.scrollTo(0, 0);
      });
    } else if(this.isLogin){
      const res = await api.get("/checkRoles/" + this.getId());
      if(!res.data.user.roles.includes("LOCAL_ADMIN")){
        router.push("/login").then(() => {
        window.scrollTo(0, 0);
      });
      }else{
        this.fetchApi();
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
      }
    });
    this.socket.on("update-book-edit", () => {
      if (this.isLogin) {
        this.fetchApi();
      }
    });
    this.socket.on("update-book-delete", () => {
      if (this.isLogin) {
        this.fetchApi();
      }
    });
    this.socket.on("upload-image-book", () => {
      if (this.isLogin) {
        this.fetchApi();
      }
    });
    this.socket.on("upload-pdf-book", () => {
      if (this.isLogin) {
        this.fetchApi();
      }
    });
    this.socket.on("requestbook-approved", () => {
      if (this.isLogin) {
        this.fetchApi();
      }
    });
  },
};
</script>
<style scoped>
.btn-confirm {
  color: #ffff;
  background-color: #b00020;
}
.btn-cancel {
  color: #ffff;
  background-color: #9e9e9e;
}
.select-width {
  width: 200px;
}
.table {
  background-color: #0008C1;
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
.btn-edit {
  color: #ffff;
  background-color: #00af70;
}
.text-color {
  color: #ffff;
}

</style>
