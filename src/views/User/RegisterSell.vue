<template>
  <Auth v-if="isLogin">
    <div class="text-center mt-6 text-header font-text">
      <span>สมัครขายหนังสือ</span>
    </div>

    <v-card class="mt-5 mx-auto pa-4 bg-card" max-width="566">
      <v-card-text>
        หลังจากที่ลงทะเบียนเป็นนักเขียน/สำนักพิมพ์แล้ว
        ต้องรอการอนุมัติจากเจ้าหน้าที่ก่อน
        เมื่อเจ้าหน้าที่ได้ทำการอนุมัติบัญชีผู้ใช้ของท่านแล้ว
        ท่านสามารถเพิ่มและอัปโหลดหนังสือเข้ามาในระบบได้ทันที
        ทั้งนี้หลังจากได้รับการอนุมัติให้เผยแพร่ผลงานแล้ว
      </v-card-text>
    </v-card>

    <v-card
      class="mt-5 mx-auto pa-4 bg-card"
      max-width="566"
      title="ข้อมูลสำนักพิมพ์ / นักเขียน"
      v-if="page === 1"
    >
      <hr />
      <v-container>
        <v-form ref="form" v-model="valid" lazy-validation>
          <v-row>
            <v-col cols="12">
              <span>บุคคล / นิติบุคคล</span>
            </v-col>
          </v-row>

          <v-row>
            <v-col cols="5">
              <span
                >นามปากกา / สำนักพิมพ์ <span style="color: red">*</span></span
              >
            </v-col>

            <v-col cols="7">
              <v-text-field
                label="กรอกนามปากกา / สำนักพิมพ์"
                variant="solo"
                :rules="publisherRule"
                v-model="form.publisher"
              ></v-text-field>
            </v-col>
          </v-row>

          <v-row>
            <v-col cols="5">
              <span>ชื่อ <span style="color: red">*</span></span>
            </v-col>

            <v-col cols="7">
              <v-text-field
                v-model="form.firstName"
                :rules="firstNameRule"
                label="กรอกชื่อ"
                variant="solo"
              ></v-text-field>
            </v-col>
          </v-row>

          <v-row>
            <v-col cols="5">
              <span>นามสกุล <span style="color: red">*</span></span>
            </v-col>

            <v-col cols="7">
              <v-text-field
                v-model="form.lastName"
                :rules="lastNameRule"
                label="กรอกนามสกุล"
                variant="solo"
              ></v-text-field>
            </v-col>
          </v-row>

          <v-row>
            <v-col cols="5">
              <span>รหัสประจำตัวประชาชน <span style="color: red">*</span></span>
            </v-col>

            <v-col cols="7">
              <v-text-field
                v-model="form.idCard"
                :rules="idCardRule"
                label="กรอกรหัสบัตรประจำตัวประชาชน"
                :counter="13"
                variant="solo"
              ></v-text-field>
            </v-col>
          </v-row>

          <v-row>
            <v-col cols="5">
              <span>เบอร์โทรศัพท์ <span style="color: red">*</span></span>
            </v-col>

            <v-col cols="7">
              <v-text-field
                v-model="form.phone"
                :rules="phoneRule"
                :counter="10"
                label="กรอกเบอร์โทรศัพท์"
                variant="solo"
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12">
              <span
                >อัพโหลดรูปบัตรประชาชน <span style="color: red">*</span></span
              >
            </v-col>
            <v-col cols="12">
              <v-file-input
                v-if="files1 === null"
                :rules="rules"
                label="อัพโหลดไฟล์ที่นี่"
                variant="solo"
                accept="image/png, image/jpeg, image/bmp"
                prepend-icon="mdi-camera"
                @change="onFileChange1"
              >
              </v-file-input>
              <p v-else>
                {{ files1[0].name }}
                <v-icon class="ml-1" @click="removeImage1"
                  >mdi-close-box</v-icon
                >
              </p>
            </v-col>
          </v-row>
        </v-form>
      </v-container>

      <v-divider></v-divider>

      <v-card-actions>
        <v-col cols="4">
          <div></div>
        </v-col>
        <v-col cols="4" class="pa-0">
          <div class="d-flex justify-center">
            <span> หน้า {{ page }}/4 </span>
          </div>
        </v-col>
        <v-col cols="4" class="pa-0">
          <div class="d-flex justify-end">
            <v-btn
              v-if="page === 1"
              class="btn-agree"
              color="white"
              type="submit"
              @click="goPage2"
            >
              <span style="font-size: 12px">หน้าต่อไป</span>
            </v-btn>
          </div>
        </v-col>
      </v-card-actions>
    </v-card>

    <v-card
      class="mt-5 mx-auto pa-4 bg-card"
      max-width="566"
      title="ที่อยู่ตามบัตรประชาชน"
      v-if="page === 2"
    >
      <hr />
      <v-container>
        <v-form ref="form1" v-model="valid1" lazy-validation>
          <v-row>
            <v-col cols="5">
              <span>ที่อยู่ <span style="color: red">*</span></span>
            </v-col>

            <v-col cols="7">
              <v-textarea
                v-model="form.address"
                :rules="[(v) => !!v || 'กรุณากรอกที่อยู่']"
                variant="solo"
              ></v-textarea>
            </v-col>
          </v-row>

          <v-row>
            <v-col cols="5">
              <span>ถนน <span style="color: red">*</span></span>
            </v-col>

            <v-col cols="7">
              <v-text-field
                v-model="form.road"
                :rules="[(v) => !!v || 'กรุณากรอกถนน']"
                variant="solo"
              ></v-text-field>
            </v-col>
          </v-row>

          <v-row>
            <v-col cols="5">
              <span>ตำบล / แขวง <span style="color: red">*</span></span>
            </v-col>

            <v-col cols="7">
              <v-text-field
                v-model="form.subDistrict"
                :rules="[(v) => !!v || 'กรุณากรอกตำบล/แขวง']"
                variant="solo"
              ></v-text-field>
            </v-col>
          </v-row>

          <v-row>
            <v-col cols="5">
              <span>อำเภอ / เขต <span style="color: red">*</span></span>
            </v-col>

            <v-col cols="7">
              <v-text-field
                v-model="form.district"
                :rules="[(v) => !!v || 'กรุณากรอกอำเภอ/เขต']"
                variant="solo"
              ></v-text-field>
            </v-col>
          </v-row>

          <v-row>
            <v-col cols="5">
              <span>จังหวัด <span style="color: red">*</span></span>
            </v-col>

            <v-col cols="7">
              <v-select
                :items="listProvince"
                v-model="form.province"
                :rules="[(v) => !!v || 'กรุณาเลือกจังหวัด']"
                label="เลือกจัดหวัด"
                variant="solo"
              ></v-select>
            </v-col>
          </v-row>

          <v-row>
            <v-col cols="5">
              <span>รหัสไปรษณีย์ <span style="color: red">*</span></span>
            </v-col>

            <v-col cols="7">
              <v-text-field
                v-model="form.postCode"
                :rules="postCodeRule"
                :counter="5"
                variant="solo"
              ></v-text-field>
            </v-col>
          </v-row>
        </v-form>
      </v-container>

      <v-divider></v-divider>

      <v-card-actions>
        <v-col cols="4">
          <div>
            <v-btn
              v-if="page === 2"
              variant="outlined"
              class="btn-back"
              @click="page--"
            >
              <span style="font-size: 12px">ย้อนกลับ</span>
            </v-btn>
          </div>
        </v-col>
        <v-col cols="4" class="pa-0">
          <div class="d-flex justify-center">
            <span> หน้า {{ page }}/4 </span>
          </div>
        </v-col>
        <v-col cols="4" class="pa-0">
          <div class="d-flex justify-end">
            <v-btn
              v-if="page === 2"
              class="btn-agree"
              color="white"
              @click="goPage3"
            >
              <span style="font-size: 12px">หน้าต่อไป</span>
            </v-btn>
          </div>
        </v-col>
      </v-card-actions>
    </v-card>

    <v-card
      class="mt-5 mx-auto pa-4 bg-card"
      max-width="566"
      title="Billing"
      v-if="page === 3"
    >
      <hr />
      <v-container>
        <v-form ref="form2" v-model="valid2" lazy-validation>
          <v-row>
            <v-col cols="3">
              <span>ธนาคาร <span style="color: red">*</span></span>
            </v-col>

            <v-col cols="9">
              <v-select
                :items="listBankAccout"
                v-model="form.bankAccount"
                :rules="[(v) => !!v || 'กรุณาเลือกธนาคาร']"
                label="เลือกธนาคาร"
                variant="solo"
              ></v-select>
            </v-col>
          </v-row>

          <v-row>
            <v-col cols="5">
              <span>หมายเลขบัญชี <span style="color: red">*</span></span>
            </v-col>

            <v-col cols="7">
              <v-text-field
                v-model="form.idAccount"
                :rules="idAccountRule"
                :counter="10"
                variant="solo"
              ></v-text-field>
            </v-col>
          </v-row>

          <v-row>
            <v-col cols="12">
              <span>อัพโหลดรูปบัญชี <span style="color: red">*</span></span>
            </v-col>
            <v-col cols="12">
              <v-file-input
                v-if="files2 === null"
                :rules="rules"
                label="อัพโหลดไฟล์ที่นี่"
                variant="solo"
                accept="image/png, image/jpeg, image/bmp"
                prepend-icon="mdi-camera"
                @change="onFileChange2"
              >
              </v-file-input>
              <p v-else>
                {{ files2[0].name }}
                <v-icon class="ml-1" @click="removeImage2"
                  >mdi-close-box</v-icon
                >
              </p>
            </v-col>
          </v-row>
        </v-form>
      </v-container>

      <v-divider></v-divider>

      <v-card-actions>
        <v-col cols="4">
          <div>
            <v-btn
              v-if="page === 3"
              variant="outlined"
              class="btn-back"
              @click="page--"
            >
              <span style="font-size: 12px">ย้อนกลับ</span>
            </v-btn>
          </div>
        </v-col>
        <v-col cols="4" class="pa-0">
          <div class="d-flex justify-center">
            <span> หน้า {{ page }}/4 </span>
          </div>
        </v-col>
        <v-col cols="4" class="pa-0">
          <div class="d-flex justify-end">
            <v-btn
              v-if="page === 3"
              class="btn-agree"
              color="white"
              @click="goPage4"
            >
              <span style="font-size: 12px">หน้าต่อไป</span>
            </v-btn>
          </div>
        </v-col>
      </v-card-actions>
    </v-card>

    <v-card
      class="mt-5 mx-auto pa-4 bg-card"
      max-width="566"
      title="ข้อตกลงสำหรับบริการ"
      v-if="page === 4"
    >
      <hr />
      <v-container>
        <v-row>
          <v-col cols="12">
            <v-checkbox
              v-model="terms"
              color="success"
              label="ฉันยอมรับข้อตกลงและเงื่อนไข"
              :rules="[(v) => !!v || 'กรุณากดตกลกเพื่อส่งข้อมูลสมัครสมาชิก!']"
            ></v-checkbox>
          </v-col>
        </v-row>
      </v-container>

      <v-divider></v-divider>

      <v-card-actions>
        <v-col cols="4">
          <div>
            <v-btn
              v-if="page === 4"
              variant="outlined"
              class="btn-back"
              @click="page--"
            >
              <span style="font-size: 12px">ย้อนกลับ</span>
            </v-btn>
          </div>
        </v-col>
        <v-col cols="4" class="pa-0">
          <div class="d-flex justify-center">
            <span> หน้า {{ page }}/4 </span>
          </div>
        </v-col>
        <v-col cols="4" class="pa-0">
          <div class="d-flex justify-end">
            <v-btn
              v-if="page === 4"
              class="btn-agree"
              color="white"
              @click.prevent="submitForm"
            >
              <span style="font-size: 12px">ส่งข้อมูล</span>
            </v-btn>
          </div>
        </v-col>
      </v-card-actions>
    </v-card>

    <v-dialog class="pa-0" v-model="showModal" max-width="500" persistent>
      <v-card>
        <v-card-title class="center">
          <div class="img-size">
            <v-img
              src="https://media.tenor.com/mvTL8ggxk2kAAAAC/chibicat-chibicatt.gif"
            >
            </v-img>
          </div>
        </v-card-title>
        <v-card-text class="text-center"
          >คุณได้ส่งคำร้องขอการอนุมัติไปแล้ว โปรดรออนุมัติ</v-card-text
        >
      </v-card>
    </v-dialog>

    <v-dialog class="pa-0" v-model="showModal1" max-width="500" persistent>
      <v-card>
        <v-card-title class="center">
          <div class="img-size">
            <v-img
              src="https://media.tenor.com/mvTL8ggxk2kAAAAC/chibicat-chibicatt.gif"
            >
            </v-img>
          </div>
        </v-card-title>
        <div class="center-loading">
          <v-progress-circular
            v-if="loading"
            :size="50"
            :width="5"
            indeterminate
            color="success"
          ></v-progress-circular>
        </div>
        <v-card-text class="text-center">กำลังทำการส่งข้อมูล</v-card-text>
      </v-card>
    </v-dialog>
  </Auth>
  <Auth v-if="!isLogin"> </Auth>
</template>
<script>
import api from "@/services/api";
import router from "@/router";
import axios from "axios";
import Auth from "@/components/Auth.vue";
export default {
  components: {
    Auth,
  },
  data() {
    return {
      files1: null,
      files2: null,
      imageIDCard: "",
      imageBankAccount: "",
      showModal: false,
      showModal1: false,
      loading: false,
      roles: [],
      request: null,
      valid: true,
      valid1: true,
      valid2: true,
      terms: false,
      reloadModal: false,
      page: 1,
      form: {
        publisher: "",
        firstName: "",
        lastName: "",
        idCard: "",
        phone: "",
        address: "",
        road: "",
        subDistrict: "",
        district: "",
        province: "",
        postCode: "",
        bankAccount: "",
        idAccount: "",
      },
      listProvince: [],
      listBankAccout: [
        "BBL-ธนาคารกรุงเทพ จำกัด (มหาชน)",
        "KBANK-ธนาคารกสิกร จำกัด (มหาชน)",
        "SCB-ธนาคารไทยพาณิชย์ จำกัด (มหาชน)",
        "BAY-ธนาคารกรุงศรีอยุธยา จำกัด (มหาชน)",
        "KTB-ธนาคารกรุงไทย จำกัด (มหาชน)",
        "TTB-ธนาคารทหารไทยธนชาต จำกัด (มหาชน)",
        "UOB-ธนาคารยูโอบี จำกัด (มหาชน)",
        "CIMB-ธนาคาร ซีไอเอ็มบี ไทย จำกัด (มหาชน)",
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
  computed: {
    isLogin() {
      return this.$store.getters["auth/isLogin"];
    },
    idCardRule() {
      return [
        (v) => !!v || "กรุณากรอกรหัสบัตรประชาชน",
        (v) => !/[ ]/.test(v) || "ห้ามเว้นวรรค",
        (v) => /^(?=.*[0-9])/.test(v) || "ระบุตัวเลข",
        (v) => (v && v.length === 13) || "ระบุอย่างน้อย 13 ตัว",
      ];
    },
    phoneRule() {
      return [
        (v) => !!v || "กรุณากรอกเบอร์โทรศัพท์",
        (v) => !/[ ]/.test(v) || "ห้ามเว้นวรรค",
        (v) => /^0\d+$/.test(v) || "เบอร์โทรศัพท์ขึ้นต้นด้วย 0 ตามด้วยตัวเลข",
        (v) => (v && v.length === 10) || "ระบุอย่างน้อย 10 ตัว",
      ];
    },
    postCodeRule() {
      return [
        (v) => !!v || "กรุณากรอกรหัสไปรษณีย์",
        (v) => !/[ ]/.test(v) || "ห้ามเว้นวรรค",
        (v) => /^(?=.*[0-9])/.test(v) || "ระบุตัวเลข",
        (v) => (v && v.length === 5) || "ระบุอย่างน้อย 5 ตัว",
      ];
    },
    idAccountRule() {
      return [
        (v) => !!v || "กรุณากรอกหมายเลขบัญชี",
        (v) => !/[ ]/.test(v) || "ห้ามเว้นวรรค",
        (v) => /^(?=.*[0-9])/.test(v) || "ระบุตัวเลข",
        (v) => (v && v.length === 10) || "ระบุอย่างน้อย 10 ตัว",
      ];
    },
    publisherRule() {
      return [
        (v) => !!v || "กรุณากรอกนามปากกา / สำนักพิมพ์!",
        (v) => !/[ ]/.test(v) || "ห้ามเว้นวรรค",
        (v) =>
          /^[a-zA-Z]+$|^[ก-๛]+$/.test(v) ||
          "ชื่อต้องเป็นภาษาอังกฤษหรือภาษาไทยเท่านั้น และ ห้ามภาษาอังกฤษผสมภาษาไทย",
      ];
    },
    firstNameRule() {
      return [
        (v) => !!v || "กรุณากรอกกรอกชื่อ!",
        (v) => !/[ ]/.test(v) || "ห้ามเว้นวรรค",
        (v) =>
          /^[a-zA-Z]+$|^[ก-๛]+$/.test(v) ||
          "ชื่อต้องเป็นภาษาอังกฤษหรือภาษาไทยเท่านั้น และ ห้ามภาษาอังกฤษผสมภาษาไทย",
      ];
    },
    lastNameRule() {
      return [
        (v) => !!v || "กรุณากรอกนามสกุล!",
        (v) => !/[ ]/.test(v) || "ห้ามเว้นวรรค",
        (v) =>
          /^[a-zA-Z]+$|^[ก-๛]+$/.test(v) ||
          "ชื่อต้องเป็นภาษาอังกฤษหรือภาษาไทยเท่านั้น และ ห้ามภาษาอังกฤษผสมภาษาไทย",
      ];
    },
  },
  methods: {
    onFileChange1(e) {
      this.files1 = e.target.files;
      if (!this.files1.length) return;

      this.createImage1(this.files1[0]);
    },
    createImage1(files) {
      let reader = new FileReader();
      reader.onload = (event) => {
        this.imageIDCard = event.target.result;
      };
      reader.readAsDataURL(files);
    },
    onFileChange2(e) {
      this.files2 = e.target.files;
      if (!this.files2.length) return;

      this.createImage2(this.files2[0]);
    },
    createImage2(files) {
      let reader = new FileReader();
      reader.onload = (event) => {
        this.imageBankAccount = event.target.result;
      };
      reader.readAsDataURL(files);
    },
    removeImage1() {
      this.imageIDCard = "";
      this.files1 = null;
    },
    removeImage2() {
      this.imageBankAccount = "";
      this.files2 = null;
    },
    async handleFileUpload1(requestId) {
      try {
        let formData = new FormData();
        formData.append("image", this.files1[0]);
        await api.post(`/upload/imageIDCard/${requestId}`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        this.removeImage1();
      } catch (error) {
        console.log(error);
      }
    },
    async handleFileUpload2(requestId) {
      try {
        let formData = new FormData();
        formData.append("image", this.files2[0]);
        await api.post(`/upload/imageBankAccount/${requestId}`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        this.removeImage2();
      } catch (error) {
        console.log(error);
      }
    },
    async goPage2() {
      const { valid } = await this.$refs.form.validate();
      if (!valid) {
        this.showAlert("กรุณากรอกข้อมูลให้ครบถ้วน");
      } else if (!this.imageIDCard) {
        this.showAlert("กรุณาอัพโหลดรูปภาพ");
      } else {
        console.log(this.files1);
        this.page++;
      }
    },
    async goPage3() {
      const { valid } = await this.$refs.form1.validate();
      if (!valid) {
        this.showAlert("กรุณากรอกข้อมูลให้ครบถ้วน");
      } else {
        this.page++;
      }
    },
    async goPage4() {
      const { valid } = await this.$refs.form2.validate();
      if (!valid) {
        this.showAlert("กรุณากรอกข้อมูลให้ครบถ้วน");
      } else if (!this.imageBankAccount) {
        this.showAlert("กรุณาอัพโหลดรูปภาพ");
      } else {
        this.page++;
      }
    },
    getId() {
      return this.$store.getters["auth/getId"];
    },
    async submitForm() {
      if (this.terms) {
        try {
          this.showModal1 = true;
          this.loading = true;
          const res = await api.post("/request", {
            user: this.getId(),
            request: "คำร้องขอสมัครขายอีบุ๊ค",
            publisher: this.form.publisher,
            firstName: this.form.firstName,
            lastName: this.form.lastName,
            idCard: this.form.idCard,
            phone: this.form.phone,
            address: this.form.address,
            road: this.form.road,
            subDistrict: this.form.subDistrict,
            district: this.form.district,
            province: this.form.province,
            postCode: this.form.postCode,
            bankAccount: this.form.bankAccount,
            idAccount: this.form.idAccount,
          });
          if (res.status === 201) {
            const requestId = res.data.newRequest._id;
            this.handleFileUpload1(requestId);
            this.handleFileUpload2(requestId);
            this.resetForm();
            setTimeout(() => {
              this.showModal1 = false;
              this.loading = false;
              router.push("/");
              this.$swal({
                confirmButtonColor: "#00af70",
                allowOutsideClick: false,
                width: "500",
                text: "บันทึกข้อมูลสำเร็จ",
                icon: "success",
                confirmButtonText: "OK",
              });
            }, 2000);
          }
        } catch (error) {
          console.log(error);
        }
      } else {
        this.showAlert("กรุณากดยืนยันเพื่อส่งข้อมูล");
      }
    },
    resetForm() {
      this.form.publisher = "";
      this.form.firstName = "";
      this.form.lastName = "";
      this.form.idCard = "";
      this.form.phone = "";
      this.form.address = "";
      this.form.road = "";
      this.form.subDistrict = "";
      this.form.district = "";
      this.form.province = "";
      this.form.postCode = "";
      this.form.bankAccount = "";
      this.form.idAccount = "";
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
    async checkRoles() {
      const res = await api.get("/checkRoles/" + this.getId());
      this.roles = res.data.user.roles;
      for (let i = 0; i < this.roles.length; i++) {
        if (this.roles[i] === "SELL") {
          router.push("/");
        }
      }
    },
    async checkRequest() {
      const res = await api.get("/checkRequestRoles/" + this.getId());
      this.request = res.data.request;
      for (let i = 0; i < this.request.length; i++) {
        if (
          this.request[i].status === "pending" &&
          this.request[i].request === "คำร้องขอสมัครขายอีบุ๊ค"
        ) {
          this.showModal = true;
          setTimeout(() => {
            this.showModal = false;
            router.push("/");
          }, 2000);
        }
      }
    },
    async apiProvince() {
      const res = await axios.get(
        "https://raw.githubusercontent.com/kongvut/thai-province-data/master/api_province.json"
      );
      for (let i = 0; i < res.data.length; i++) {
        this.listProvince.push(res.data[i].name_th);
      }
    },
  },

  mounted() {
    if (this.isLogin) {
      this.page = 1;
      this.checkRoles();
      this.checkRequest();
      this.apiProvince();
    }
  },
};
</script>
<style scoped>
.text-header {
  font-size: 2rem;
}
.font-text {
  font-family: Prompt, sans-serif;
}

.bg-card {
  background-color: #f6f6f6;
}
.btn-agree {
  border-radius: 20px;
  background-color: #00af70;
}
.btn-back {
  border-radius: 20px;
  color: #00af70;
}
.img-size {
  width: 100px;
}
.center-loading {
  display: flex;
  justify-content: center;
  align-items: center;
}
.center {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
