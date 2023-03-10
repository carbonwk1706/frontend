<template>
  <h2 class="mb-3">เพิ่มหนังสือ</h2>
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
          v-model="form.name"
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
          v-model="form.author"
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
          v-model="form.publisher"
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
          v-model="form.category"
          :items="categoryItem"
          variant="outlined"
          :rules="[(v) => !!v || 'กรุณาเลือกหมวดหมู่']"
        ></v-select>
        <v-card-text class="pa-2">
          ราคา <span style="color: red">*</span>
        </v-card-text>
        <v-text-field
          v-model="form.price"
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
        <v-card-text class="pa-2">
          อัพโหลดรูปภาพหนังสือ <span style="color: red">*</span>
        </v-card-text>
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
          <v-icon class="ml-1" @click="removeImage1">mdi-close-box</v-icon>
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
      valid: true,
      files1: null,
      files2: null,
      imagePreview: "",
      form: {
        name: "",
        author: "",
        publisher: "",
        category: "",
        price: 0,
        imageBook: "image",
        pdf: "pdf",
        user: [],
      },

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
        (v) =>
          /^[a-zA-Z]+$|^[ก-๛]+$/.test(v) ||
          "ชื่อต้องเป็นภาษาอังกฤษหรือภาษาไทยเท่านั้น และ ห้ามภาษาอังกฤษผสมภาษาไทย",
      ],
      categoryItem: ["การ์ตูนทั่วไป", "นิยาย"],
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

      this.createImage1(this.files1[0]);
    },
    onFileChange2(e) {
      this.files2 = e.target.files;
      if (!this.files2.length) return;
    },
    createImage1(files) {
      let reader = new FileReader();
      reader.onload = (event) => {
        this.imagePreview = event.target.result;
      };
      reader.readAsDataURL(files);
    },
    removeImage1() {
      this.imagePreview = "";
      this.files1 = null;
    },
    removePDF() {
      this.files2 = null;
    },
    async handleFileUpload1(bookId) {
      try {
        let formData = new FormData();
        formData.append("image", this.files1[0]);
        await api.post(`/upload/imageBook/${bookId}`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        this.removeImage1();
      } catch (error) {
        console.log(error);
      }
    },
    async handleFileUpload2(bookId) {
      try {
        let formData = new FormData();
        formData.append("pdf", this.files2[0]);
        await api.post(`/upload/pdf/${bookId}`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        this.removePDF();
      } catch (error) {
        console.log(error);
      }
    },
    goToBooks() {
      router.push("/bookadmin").then(() => {
        window.scrollTo(0, 0);
      });
    },
    async checkDuplicate() {
      const { valid } = await this.$refs.form.validate();
      if (!valid) {
        this.showAlert("กรุณากรอกข้อมูลให้ถูกต้อง");
      } else if (!this.imagePreview && this.files2 === null) {
        this.showAlert("กรุณาอัพโหลดรูปภาพ และ PDF");
      } else if (!this.imagePreview) {
        this.showAlert("กรุณาอัพโหลดรูปภาพ");
      } else if (this.files2 === null) {
        this.showAlert("กรุณาอัพโหลด PDF");
      } else {
        try {
          const res = await api.post("/checkDuplicateBook/", {
            name: this.form.name,
          });
          if (
            res.status === 201 &&
            res.data.message === "BookName already exist"
          ) {
            this.showAlert("ชื่อหนังสือนี้ถูกใช้งานไปแล้ว");
          } else {
            this.submit();
          }
        } catch (error) {
          this.showAlert("Error");
        }
      }
    },

    resetForm() {
      this.form.name = "";
      this.form.author = "";
      this.form.publisher = "";
      this.form.category = "";
      this.form.price = 0;
      this.form.imageBook = "image";
      this.form.pdf = "pdf";
    },
    showAlert(text) {
      this.$swal({
        scrollbarPadding: false,
        confirmButtonColor: "#00af70",
        allowOutsideClick: false,
        width: "500",
        text: text,
        icon: "warning",
        button: "OK",
      });
    },
    getId() {
      return this.$store.getters["authAdmin/getId"];
    },
    async submit() {
      try {
        const res = await api.post("/books/", {
          name: this.form.name,
          author: this.form.author,
          publisher: this.form.publisher,
          category: this.form.category,
          price: this.form.price,
          imageBook: this.form.imageBook,
          pdf: this.form.pdf,
          adminId: this.getId(),
        });
        if (res.status === 201) {
          const bookId = res.data.newBook._id;
          this.handleFileUpload1(bookId);
          this.handleFileUpload2(bookId);
          this.resetForm();
          router.push("/bookadmin").then(() => {
            window.scrollTo(0, 0);
          });
          this.showAlertSuccess("เพิ่มหนังสือสำเร็จ");
        }
      } catch (error) {
        console.log(error);
      }
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
  },
  computed: {
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
        router.push("/login").then(() => {
          window.scrollTo(0, 0);
        });
      }
    }
  },
};
</script>
<style scoped>
.btn-color {
  color: #ffff;
  background-color: #00af70;
}
</style>
