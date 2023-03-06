<template>
  <h2 class="mb-3">แก้ไขหนังสือ</h2>
  <v-divider class="mb-5"></v-divider>
  <v-card>
    <v-container class="pa-2">
      <v-form
        ref="form"
        v-model="valid"
        lazy-validation
        @submit.prevent="checkDuplicate"
      >
        <v-card-text class="pa-2">
          ชื่อหนังสือ <span style="color: red">*</span>
        </v-card-text>
        <v-text-field
          v-model="bookList.name"
          prepend-inner-icon="mdi-book-multiple"
          variant="outlined"
          required
          placeholder="ชื่อหนังสือ"
          :rules="nameRule"
        ></v-text-field>
        <v-card-text class="pa-2">
          ชื่อผู้แต่ง <span style="color: red">*</span>
        </v-card-text>
        <v-text-field
          v-model="bookList.author"
          prepend-inner-icon="mdi-account"
          variant="outlined"
          required
          placeholder="ชื่อผู้แต่ง"
          :rules="authorRule"
        ></v-text-field>
        <v-card-text class="pa-2">
          สำนักพิมพ์ <span style="color: red">*</span>
        </v-card-text>
        <v-text-field
          v-model="bookList.publisher"
          prepend-inner-icon="mdi-domain"
          variant="outlined"
          required
          placeholder="สำนักพิมพ์"
          :rules="publisherRule"
        ></v-text-field>
        <v-card-text class="pa-2">
          หมวดหมู่ <span style="color: red">*</span>
        </v-card-text>
        <v-select
          prepend-inner-icon="mdi-format-list-bulleted-type"
          v-model="bookList.category"
          :items="categoryItem"
          variant="outlined"
          :rules="[(v) => !!v || 'กรุณาเลือกหมวดหมู่']"
        ></v-select>
        <v-card-text class="pa-2">
          ราคา <span style="color: red">*</span>
        </v-card-text>
        <v-text-field
          v-model="bookList.price"
          :rules="[
            (v) => !!v || 'กรุณากรอกราคา',
            (v) =>
              !(v.toString().startsWith(0) && v.toString().length > 1) ||
              'ราคาไม่สามารถเริ่มต้นด้วยเลข 0 ได้',
            (v) => v > 0 || 'กรุณากรอกราคา > 0',
          ]"
          prepend-inner-icon="mdi-cash-multiple"
          variant="outlined"
          required
          type="number"
          placeholder="ราคา"
        ></v-text-field>
        <v-col cols="12">
          <p class="pa-2">รูปภาพหนังสือ</p>
          <v-img :src="bookList.imageBook" width="300px"></v-img>
        </v-col>
        <v-card-text class="pa-2"> ไฟล์รูปภาพ </v-card-text>
        <v-text-field
          v-model="bookList.imageBook"
          prepend-inner-icon="mdi-image"
          variant="outlined"
          disabled
        ></v-text-field>
        <v-card-text class="pa-2"> ไฟล์ PDF </v-card-text>
        <v-text-field
          v-model="bookList.pdf"
          prepend-inner-icon="mdi-file-pdf-box"
          variant="outlined"
          disabled
        ></v-text-field>
        <v-card-text class="pa-2"> อัพโหลดรูปภาพหนังสือ </v-card-text>
        <v-file-input
          v-if="files1 === null"
          :rules="rules"
          label="อัพโหลดรูปภาพหนังสือ"
          variant="outlined"
          accept="image/png, image/jpeg, image/bmp"
          prepend-icon="mdi-image"
          @change="onFileChange1"
        >
        </v-file-input>
        <p class="pa-2" v-else>
          {{ files1[0].name }}
          <v-icon class="ml-1" @click="removeImage">mdi-close-box</v-icon>
        </p>
        <v-card-text class="pa-2">
          อัพโหลดไฟล์ PDF <span style="color: red">*</span>
        </v-card-text>
        <v-file-input
          v-if="files2 === null"
          :rules="rules"
          label="อัพโหลดไฟล์ PDF"
          variant="outlined"
          accept="application/pdf"
          prepend-icon="mdi-file-pdf-box"
          @change="onFileChange2"
        >
        </v-file-input>
        <p class="pa-2" v-else>
          {{ files2[0].name }}
          <v-icon class="ml-1" @click="removePDF">mdi-close-box</v-icon>
        </p>
      </v-form>
    </v-container>
    <v-divider></v-divider>
    <v-card-actions class="d-flex justify-center">
      <v-btn
        type="submit"
        class="btn-color px-10"
        size="large"
        variant="elevated"
        @click="checkDuplicate"
        >ส่งข้อมูล
      </v-btn>
      <v-btn
        color="error"
        class="px-10"
        size="large"
        variant="elevated"
        @click="goToBooks"
        >ยกเลิก
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import api from "@/services/api";
import router from "@/router";

export default {
  data() {
    return {
      bookList: [],
      files1: null,
      files2: null,
      valid: false,
      lazy: false,
      namecurrent: "",
      categoryItem: ["การ์ตูนทั่วไป", "นิยาย"],
      nameRule: [
        (v) => !!v || "กรุณากรอกชื่อหนังสือ",
        (v) => /^\S/.test(v) || "ห้ามเว้นวรรคข้างหน้า",
      ],
      authorRule: [
        (v) => !!v || "กรุณากรอกชื่อผู้แต่ง",
        (v) => /^\S/.test(v) || "ห้ามเว้นวรรคข้างหน้า",
      ],
      publisherRule: [
        (v) => !!v || "กรุณากรอกชื่อสำนักพิมพ์",
        (v) => /^\S/.test(v) || "ห้ามเว้นวรรคข้างหน้า",
      ],
      rules: [
        (value) => {
          return (
            !value ||
            !value.length ||
            value[0].size < 2000000 ||
            "Image size should be less than 2 MB!"
          );
        },
      ],
    };
  },
  methods: {
    onFileChange1(e) {
      this.files1 = e.target.files;
      if (!this.files1.length) return;
    },
    onFileChange2(e) {
      this.files2 = e.target.files;
      if (!this.files2.length) return;
    },
    removeImage() {
      this.files1 = null;
    },
    removePDF() {
      this.files2 = null;
    },
    async handleFileUpload1(bookId, historyId) {
      try {
        let formData = new FormData();
        formData.append("image", this.files1[0]);
        const res = await api.post(`/upload/imageBook/${bookId}`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        if (res.status === 200) {
          const imageBookUpload = res.data.book.imageBook;
          await api.patch("/books/updateImage/" + historyId, {
            imageBook: imageBookUpload,
          });
        }
        this.removeImage();
      } catch (error) {
        console.log(error);
      }
    },
    async handleFileUpload2(bookId, historyId) {
      try {
        let formData = new FormData();
        formData.append("pdf", this.files2[0]);
        const res = await api.post(`/upload/pdf/${bookId}`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        if (res.status === 200) {
          const pdfUpload = res.data.book.pdf;
          await api.patch("/books/updatePdf/" + historyId, {
            pdf: pdfUpload,
          });
        }
        this.removePDF();
      } catch (error) {
        console.log(error);
      }
    },
    async checkDuplicate() {
      const { valid } = await this.$refs.form.validate();
      if (!valid) {
        this.showAlert("กรุณากรอกข้อมูลให้ถูกต้อง");
      } else {
        if (
          this.bookList.name === this.namecurrent &&
          this.files1 === null &&
          this.files2 === null
        ) {
          this.submit();
        } else if (
          this.bookList.name === this.namecurrent &&
          this.files1 !== null &&
          this.files2 === null
        ) {
          this.submitImage();
        } else if (
          this.bookList.name === this.namecurrent &&
          this.files1 === null &&
          this.files2 !== null
        ) {
          this.submitPDF();
        } else if (
          this.bookList.name === this.namecurrent &&
          this.files1 !== null &&
          this.files2 !== null
        ) {
          this.submitImagePDF();
        } else {
          try {
            const res = await api.post("/checkDuplicateBook/", {
              name: this.bookList.name,
            });
            if (
              res.status === 201 &&
              res.data.message === "BookName already exist"
            ) {
              this.showAlert("ชื่อหนังนี้ถูกใช้งานไปแล้ว");
            } else {
              if (this.files1 === null && this.files2 === null) {
                this.submit();
              } else if (this.files1 !== null && this.files2 === null) {
                this.submitImage();
              } else if (this.files1 === null && this.files2 !== null) {
                this.submitPDF();
              } else if (this.files1 !== null && this.files2 !== null) {
                this.submitImagePDF();
              }
            }
          } catch (error) {
            this.showAlert("Error");
          }
        }
      }
    },
    async fetchApi() {
      const res = await api.get("/books/" + this.$route.params.id);
      this.bookList = res.data;
      this.namecurrent = this.bookList.name;
    },
    getId() {
      return this.$store.getters["authAdmin/getId"];
    },
    submit() {
      api
        .patch("/books/" + this.$route.params.id, {
          name: this.bookList.name,
          author: this.bookList.author,
          publisher: this.bookList.publisher,
          category: this.bookList.category,
          price: this.bookList.price,
          imageBook: this.bookList.imageBook,
          pdf: this.bookList.pdf,
          adminId: this.getId(),
        })
        .then(() => {
          this.$router.push("/bookadmin");
          this.showAlertSuccess("แก้ไขข้อมูลสำเร็จ");
        });
    },
    async submitImage() {
      try {
        const res = await api.put("/books/" + this.$route.params.id, {
          name: this.bookList.name,
          author: this.bookList.author,
          publisher: this.bookList.publisher,
          category: this.bookList.category,
          price: this.bookList.price,
          imageBook: this.bookList.imageBook,
          pdf: this.bookList.pdf,
          adminId: this.getId(),
        });
        if (res.status === 200) {
          const bookId = res.data.book._id;
          const historyId = res.data.history._id;
          this.handleFileUpload1(bookId, historyId);
          this.$router.push("/bookadmin");
          this.showAlertSuccess("เพิ่มหนังสือสำเร็จ");
        }
      } catch (error) {
        console.log(error);
      }
    },
    async submitPDF() {
      try {
        const res = await api.put("/books/" + this.$route.params.id, {
          name: this.bookList.name,
          author: this.bookList.author,
          publisher: this.bookList.publisher,
          category: this.bookList.category,
          price: this.bookList.price,
          imageBook: this.bookList.imageBook,
          pdf: this.bookList.pdf,
          adminId: this.getId(),
        });
        if (res.status === 200) {
          const bookId = res.data.book._id;
          const historyId = res.data.history._id;
          this.handleFileUpload2(bookId, historyId);
          this.$router.push("/bookadmin");
          this.showAlertSuccess("เพิ่มหนังสือสำเร็จ");
        }
      } catch (error) {
        console.log(error);
      }
    },
    async submitImagePDF() {
      try {
        const res = await api.put("/books/" + this.$route.params.id, {
          name: this.bookList.name,
          author: this.bookList.author,
          publisher: this.bookList.publisher,
          category: this.bookList.category,
          price: this.bookList.price,
          imageBook: this.bookList.imageBook,
          pdf: this.bookList.pdf,
          adminId: this.getId(),
        });
        if (res.status === 200) {
          const bookId = res.data.book._id;
          const historyId = res.data.history._id;
          this.handleFileUpload1(bookId, historyId);
          this.handleFileUpload2(bookId, historyId);
          this.$router.push("/bookadmin");
          this.showAlertSuccess("เพิ่มหนังสือสำเร็จ");
        }
      } catch (error) {
        console.log(error);
      }
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
    showAlertSuccess(text) {
      this.$swal({
        confirmButtonColor: "#00af70",
        allowOutsideClick: false,
        width: "500",
        icon: "success",
        text: text,
        button: "OK",
      });
    },
    goToBooks() {
      router.push("/bookadmin");
    },
  },
  computed: {
    isLogin() {
      return this.$store.getters["authAdmin/isLogin"];
    },
  },
  mounted() {
    if (this.isLogin) {
      this.fetchApi();
    } else {
      router.push("/login");
    }
  },
};
</script>
<style scoped>
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
  background-color: #b00020;
}
.text-center {
  display: flex;
  justify-content: center;
}
.btn-color {
  color: #ffff;
  background-color: #00af70;
}
</style>
