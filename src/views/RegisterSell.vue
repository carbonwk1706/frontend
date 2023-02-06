<template>
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
            <span>นามปากกา / สำนักพิมพ์ <span style="color: red">*</span></span>
          </v-col>

          <v-col cols="7">
            <v-text-field
              label="กรอกนามปากกา / สำนักพิมพ์"
              variant="solo"
              :rules="[(v) => !!v || 'กรุณากรอกนามปากกา / สำนักพิมพ์!']"
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
              :rules="[(v) => !!v || 'กรุณากรอกกรอกชื่อ!']"
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
              :rules="[(v) => !!v || 'กรุณากรอกนามสกุล!']"
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
              label="กรอกเบอร์โทรศัพท์"
              variant="solo"
            ></v-text-field>
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
          >
            <span @click="goPage2" style="font-size: 12px">หน้าต่อไป</span>
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
</template>
<script>
import api from "@/services/api";
import router from "@/router";
export default {
  data() {
    return {
      roles: [],
      request: null,
      valid: true,
      valid1: true,
      valid2: true,
      terms: false,
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
      listProvince: ["กรุงเทพมหานคร", "สมุทรปราการ"],
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
      idCardRule: [
        (v) => !!v || "กรุณากรอกรหัสบัตรประชาชน",
        (v) => (v && v.length === 13) || "ระบุอย่างน้อย 13 ตัว",
      ],
      phoneRule: [
        (v) => !!v || "กรุณากรอกเบอร์โทรศัพท์",
        (v) => (v && v.length === 10) || "ระบุอย่างน้อย 10 ตัว",
      ],
      postCodeRule: [
        (v) => !!v || "กรุณากรอกรหัสไปรษณีย์",
        (v) => (v && v.length === 5) || "ระบุอย่างน้อย 5 ตัว",
      ],
      idAccountRule: [
        (v) => !!v || "กรุณากรอกหมายเลขบัญชี",
        (v) => (v && v.length === 10) || "ระบุอย่างน้อย 10 ตัว",
      ],
    };
  },
  methods: {
    async goPage2() {
      const { valid } = await this.$refs.form.validate();
      if (!valid) {
        this.showAlert("กรุณากรอกข้อมูลให้ครบถ้วน");
      } else {
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
      } else {
        this.page++;
      }
    },
    async submitForm() {
      if (this.terms) {
        try {
          await api.post("/request", {
            user: this.$store.getters["auth/getId"],
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
          this.page = 1;
          this.resetForm();
          this.$swal({
            confirmButtonColor: "#00af70",
            allowOutsideClick: false,
            width: "500",
            text: "บันทึกข้อมูลสำเร็จ",
            icon: "success",
            confirmButtonText: "OK",
          }).then((result) => {
            if (result.value) {
              router.push("/");
              window.location.reload();
            }
          });
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
        confirmButtonColor: "#00af70",
        allowOutsideClick: false,
        width: "500",
        text: text,
        icon: "warning",
        button: "OK",
      });
    },
    getId() {
      return this.$store.getters["auth/getId"];
    },
    async checkRoles() {
      const res = await api.get(
        "/checkRoles/" + this.getId()
      );
      this.roles = res.data.user.roles;
      for(let i=0;i<this.roles.length;i++){
      if(this.roles[i] === "SELL"){
        router.push("/")
      }
    }
    },
    async checkRequest() {
      const res = await api.get(
        "/checkRequestRoles/" + this.getId()
      );
      this.request = res.data.request;
      for(let i=0;i<this.request.length;i++){
        if(this.request[i].status === 'pending') {
          console.log("Hello")
        }
    }
    },
  },
  mounted() {
    this.page = 1;
    this.checkRoles()
    this.checkRequest()
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
</style>
