<template>
  <v-container fluid>
  <v-row>
    <v-col cols="12">
      <div class="text-end">
      <v-btn color="blue-grey" class="mb-3" @click="addBook">เพิ่มหนังสือ</v-btn>
    </div>
      <v-table dense class="elevation-1">
        <thead class="table">
          <tr>
            <th class="text-left">Name</th>
            <th class="text-left">Author</th>
            <th class="text-left">Publisher</th>
            <th class="text-left">Category</th>
            <th class="text-left">Price</th>
            <th class="text-left">Image</th>
            <th class="text-left"></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in bookList" :key="index">
            <td class="ellipsis-one-line mt-2">
              <span>{{ item.name }}</span>
            </td>
            <td class="mt-2">{{ item.author }}</td>
            <td class="mt-2">{{ item.publisher }}</td>
            <td class="mt-2">{{ item.category }}</td>
            <td class="mt-2">{{ item.price }}</td>
            <td class="ellipsis mt-2">
              <v-avatar  rounded="0" size="80"> 
                <v-img :src="item.imageBook" />
              </v-avatar>
            </td> 
            <td class="d-flex justify-center mt-15">
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
    </v-col>
  </v-row>
  
  <v-dialog
      v-model="showConfirm"
      persistent
      style="z-index: 900"
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
</template>

<script>
import api from "@/services/api";
export default {
  components: {},
  data() {
    return {
      bookList: [],
      cartList:[],
      inventoryUser:[],
      selectedBook:[],
      showConfirm:false
    };
  },
  methods: {
    async fetchApi() {
      try {
        const result = await api.get("/books");
        this.bookList = result.data;
      } catch (error) {
        console.log(error);
      }
    },
    editBook(book){
      this.$router.push(`/bookadmin/${book._id}`);
    },
    addBook(){
      this.$router.push(`/newbookadmin`);
    },
    async deleteBook(book){
      this.getCart()
      if(this.cartList.length === 0){
        console.log("Null")
         try {
        await api.delete("/books/" + book._id, book);
        this.showAlert();
      } catch (error) {
        console.error(error);
      }
      this.fetchApi();
      }else{
        console.log(this.cartList)

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
    // async getInventoryUser() {
    //   const res = await api.get("/inventory/" + this.getId());
    //   this.inventoryUser = res.data;
    // },

  },
  mounted() {
    this.fetchApi();
  },
};
</script>
<style>
.table {
  background-color: #00af70;
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
.text-end {
  display: flex;
  justify-content: end;
}
</style>
