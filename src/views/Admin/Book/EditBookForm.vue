<template>
  <v-container fluid>
    <v-card>
      <v-row>
        <v-col cols="12" class="my-5">
          <v-form ref="form" v-model="valid" :lazy-validation="lazy">
            <v-container>
              <v-row>
                <v-col>
                  <v-text-field
                    label="Name"
                    v-model="bookList.name"
                    :rules="nameRule"
                  />
                </v-col>
              </v-row>
              <v-row>
                <v-col>
                  <v-text-field
                    label="Author"
                    v-model="bookList.author"
                    :rules="authorRule"
                  />
                </v-col>
              </v-row>
              <v-row>
                <v-col>
                  <v-text-field
                    label="Publisher"
                    v-model="bookList.publisher"
                  />
                </v-col>
              </v-row>
              <v-row>
                <v-col>
                  <v-select
                    label="Category"
                    v-model="bookList.category"
                    :items ="categoryItem"
                  />
                </v-col>
              </v-row>
              <v-row>
                <v-col>
                  <v-text-field
                    label="Price"
                    v-model="bookList.price"
                    type="number"
                  />
                </v-col>
              </v-row>
              <v-row>
                <v-col>
                  <v-text-field
                    label="Image URL"
                    v-model="bookList.imageBook"
                  />
                </v-col>
              </v-row>
              <v-row>
                <v-col class="text-center">
                  <v-btn
                    class="btn-agree"
                    rounded
                    @click="showConfirmDialog = true"
                    >ยืนยัน</v-btn
                  >
                </v-col>
                <v-col class="text-center">
                  <v-btn color="error" rounded @click="submit">ยกเลิก</v-btn>
                </v-col>
              </v-row>
            </v-container>
          </v-form>
        </v-col>
      </v-row>
    </v-card>
  </v-container>

  <v-dialog
    v-model="showConfirmDialog"
    persistent
    style="z-index: 900"
    :center="true"
    max-width="500"
    :padding="20"
  >
    <v-card>
      <v-card-title class="headline text-center">ยืนยันการแก้ไข</v-card-title>
      <v-card-text class="text-center"
        >ต้องการยืนยันการแก้ไขหรือไม่</v-card-text
      >
      <v-card-actions class="text-center">
        <v-btn  @click="changeDuplicate()" class="mr-10 btn-agree"
          >ยืนยัน</v-btn
        >
        <v-btn class="btn-cancel" @click="showConfirmDialog = false"
          >ยกเลิก</v-btn
        >
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import api from "@/services/api";

export default {
  data() {
    return {
      bookList: [],
      valid: false,
      lazy: false,
      namecurrent:"",
      categoryItem: ["การ์ตูนทั่วไป", "นิยาย"],
      showConfirmDialog: false,
      nameRule: [(v) => !!v || "กรุณากรอกชื่อหนังสือ",(v) =>
      /^\S/.test(v) ||
          "ห้ามเว้นวรรคข้างหน้า"],
      authorRule: [(v) => !!v || "กรุณากรอกชื่อผู้แต่ง", (v) =>
      /^\S/.test(v) ||
          "ห้ามเว้นวรรคข้างหน้า"],
      publisherRule: [(v) => !!v || "กรุณากรอกชื่อสำนักพิมพ์",(v) =>
      /^\S/.test(v) ||
          "ห้ามเว้นวรรคข้างหน้า"],
    };
  },
  methods: {
    async changeDuplicate() {
      const { valid } = await this.$refs.form.validate();
      if (!valid) {
        this.showAlert("กรุณากรอกข้อมูลให้ถูกต้อง");
      } else{
        if(this.bookList.name === this.namecurrent){
          this.submit()
        }else{
          try{
              const res = await api.post("/checkDuplicateBook/",
              {
                name:this.bookList.name
              });
              console.log(res)
              if(res.status === 201 && res.data.message === "BookName already exist"){
                this.showAlert("ชื่อหนังนี้ถูกใช้งานไปแล้ว");
              }else{
                this.submit()
              }
          }catch(error){
            console.log(error);
          }
        }
      }
    },
    async fetchApi() {
      const res = await api.get("/books/" + this.$route.params.id);
      this.bookList = res.data;
      this.namecurrent =this.bookList.name
    },
    submit() {
      api.put("/books/" + this.$route.params.id, this.bookList).then(() => {
        this.$router.push("/bookadmin");
      });
    },
    showAlert(text) {
      this.showConfirmDialog = false;
      this.$swal({
        confirmButtonColor: "#00af70",
        allowOutsideClick: false,
        width: "500",
        text: text,
        icon: "warning",
        button: "OK",
      });
    },
  },
  mounted() {
    this.fetchApi();
  },
};
</script>
<style>
.text-center {
  display: flex;
  justify-content: center;
}

.btn-agree {
  color: #ffff;
  background-color: #00af70;
}
.btn-cancel {
  color: #ffff;
  background-color: #B00020;
}
</style>
