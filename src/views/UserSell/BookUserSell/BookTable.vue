<template>
  <AuthSell v-if="isLogin">
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
          <th class="text-xs-center"><span class="text-color">ชื่อหนังสือ</span></th>
          <th class="text-xs-center"><span class="text-color">ผู้แต่ง</span></th>
          <th class="text-xs-center"><span class="text-color">สำนักพิมพ์</span></th>
          <th class="text-xs-center"><span class="text-color">หมวดหมู่</span></th>
          <th class="text-xs-center"><span class="text-color">ราคา</span></th>
          <th class="text-xs-center"><span class="text-color">จำนวน</span></th>
          <th class="text-xs-center"><span class="text-color">รูปภาพ</span></th>
          
          <th class="text-xs-center"></th>
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
          <td class="ellipsis-one-line mt-2 text-xs-center">
            <span>{{ item.name }}</span>
          </td>
          <td class="mt-2 mb-2 text-xs-center">{{ item.author }}</td>
          <td class="mt-2 mb-2 text-xs-center">{{ item.publisher }}</td>
          <td class="mt-2 mb-2 text-xs-center">{{ item.category }}</td>
          <td class="mt-2 mb-2 text-xs-center">{{ item.price }}</td>
          <td class="mt-2 mb-2 text-xs-center">{{ item.price }}</td>
          <td class="text-xs-center">
            <v-avatar rounded="0" size="70">
              <v-img :src="item.imageBook" />
            </v-avatar>
          </td>        
          <td class="d-flex mt-5 text-xs-center">
            <v-btn
              variant="flat"
              color="success"
              class="mr-3"
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
            src="https://www.mebmarket.com/web/dist/assets/images/imgMebcatMebphone@2x.png"
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
          <v-btn color="Grey" text @click="showConfirm = false"> ยกเลิก </v-btn>
          <v-btn
            color="red darken-1"
            text
            @click="
              deleteBook(selectedBook);
              showConfirm = false;
            "
          >
            ลบ
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
  </AuthSell>
  <AuthSell v-if="!isLogin">
</AuthSell>
</template>

<script>
import api from "@/services/api";
import AuthSell from "@/components/AuthSell.vue";

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
      cartList: [],
      inventoryUser: [],
      selectedBook: [],
      showConfirm: false,
    };
  },
  methods: {
    async fetchApi() {
      try {
        const result = await api.get("/books/all");
        this.bookList = result.data;
      } catch (error) {
        console.log(error);
      }
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
      this.$router.push(`/booktable/${book._id}`);
    },
    addBook() {
      this.$router.push(`/newbook`);
    },
    async deleteBook(book) {
      this.getCart();
      if (this.cartList.length === 0) {
        console.log("Null");
        try {
          await api.delete("/books/" + book._id, book);
          this.showAlert();
        } catch (error) {
          console.error(error);
        }
        this.fetchApi();
      } else {
        console.log(this.cartList);
      }
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
    async getCart() {
      const res = await api.get("/cart");
      this.cartList = res.data;
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
  mounted() {
    this.fetchApi();
  },
};
</script>
<style>
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
.text-color{
  color: #ffff;
}
</style>
