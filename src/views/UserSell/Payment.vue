<template>
  <AuthSell v-if="isLogin">
    <v-container fluid>
      <v-row class="mb-3 mt-3">
        <v-col cols="12" class="d-flex justify-center">
          <span style="font-size: 24px">กระเป๋าเงิน</span>
        </v-col>
      </v-row>
      <v-row class="bg-white my-3 rounded border px-3">
        <v-col cols="12">
          <v-row class="d-flex justify-center">
            <v-col cols="6" class="d-flex justify-end">
              <span>ยอดเงิน:</span>
            </v-col>
            <v-col cols="6" class="d-flex justify-start">
              <span>{{ balance }} บาท</span>
            </v-col>
            <v-col cols="6" class="d-flex justify-end">
              <span>บัญชีธนาคาร:</span>
            </v-col>
            <v-col cols="6" class="d-flex justify-start">
              <span>{{ bankAccount }}</span>
            </v-col>
            <v-col cols="6" class="d-flex justify-end">
              <span>เลขบัญชี:</span>
            </v-col>
            <v-col cols="6" class="d-flex justify-start">
              <span>{{ idAccount }}</span>
            </v-col>
          </v-row>

          <v-col cols="12">
            <v-row class="d-flex justify-center">
              <v-col cols="12" class="d-flex justify-start">
                <span>จำนวนเงิน:</span>
              </v-col>
              <v-col cols="12">
                <v-form ref="form" v-model="valid" lazy-validation>
                  <v-col cols="12" class="d-flex justify-start">
                    <v-text-field
                      v-model="amount"
                      variant="solo"
                      :rules="amountRule"
                      type="number"
                      label="ถอนเงินขั้นตํ่า 100 บาท"
                    />
                  </v-col>
                </v-form>
              </v-col>
            </v-row>
          </v-col>
          <v-col cols="12" class="d-flex justify-center">
            <v-btn
              type="submit"
              color="#0008C1"
              variant="elevated"
              class="mt-5"
              size="large"
              rounded
              @click="showModalConfirm"
            >
              <span class="font-text text-color">ส่งข้อมูล</span>
            </v-btn></v-col
          >
        </v-col>
      </v-row>
    </v-container>

    <v-dialog
      v-model="showConfirm"
      max-width="500"
      :center="true"
      persistent
      style="z-index: 900"
      :padding="20"
    >
      <v-card>
        <div class="d-flex justify-end pa-1">
          <v-icon @click="toggleShowModalConfirm">mdi-close</v-icon>
        </div>
        <v-card-title class="text-center font-text">
          ยืนยันรหัสผ่าน
        </v-card-title>
        <div class="pa-3 center-loading">
          <v-text-field
            prepend-inner-icon="mdi-lock-outline"
            :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'"
            @click:append-inner="visible = !visible"
            label="Password"
            v-model="password"
            variant="outlined"
            :type="visible ? 'text' : 'password'"
          ></v-text-field>
        </div>
        <v-card-actions class="center">
          <v-btn color="white" class="btn-bg" text @click="confirmPassword">
            OK
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </AuthSell>
  <AuthSell v-if="!isLogin"> </AuthSell>
</template>

<script>
import api from "@/services/api";
import router from "@/router";
import AuthSell from "@/components/AuthSell.vue";
import io from "socket.io-client";
export default {
  components: {
    AuthSell,
  },

  computed: {
    isLogin() {
      return this.$store.getters["auth/isLogin"];
    },
  },
  data() {
    return {
      valid: true,
      amount: 0,
      showConfirm: false,
      isVisible: false,
      visible: false,
      password: "",
      balance: 0,
      idAccount: "",
      bankAccount: "",
      socket: null,
      socketioURL: "http://localhost:3000",

      amountRule: [
        (v) => !!v || "กรุณาใส่จำนวนเงิน",
        (v) => v >= 100 || "จำนวนเงินต้องมากกว่าหรือเท่ากับ 100 บาท",
        (v) =>
          v <= this.balance ||
          "จำนวนเงินต้องน้อยกว่าหรือเท่ากับ " + this.balance + " บาท",
      ],
    };
  },
  methods: {
    async showModalConfirm() {
      const { valid } = await this.$refs.form.validate();
      if (!valid) {
        this.alertError("ระบุข้อมูลให้ถูกต้อง");
      } else {
        this.showConfirm = true;
      }
    },
    async sendRequest() {
      const user = await api.get("/users/" + this.getId());
      const res = await api.post("/requestpayment", {
        request: "คำร้องแจ้งขอถอนเงิน",
        user: this.getId(),
        username: user.data.username,
        imageBankAccount: user.data.imageBankAccount,
        firstName: user.data.firstName,
        lastName: user.data.lastName,
        bankAccount: user.data.bankAccount,
        idAccount: user.data.idAccount,
        phone: user.data.phone,
        amount: this.amount,
      });
      if (res.status === 200 && res.data.message === "Not enough revenue") {
        this.alertError("ยอดเงินของคุณไม่พอที่จะถอนเงิน");
      } else {
        this.getBalance();
        this.amount = 0;
        this.showAlert("แจ้งถอนสำเร็จรอดำเนินการภายใน 24 ชั่วโมง");
        router.push("/paymenthistory").then(() => {
          window.scrollTo(0, 0);
        });
      }
    },
    async confirmPassword() {
      try {
        const response = await api.post("/confirmPassword", {
          id: this.getId(),
          password: this.password,
        });
        if (response.data.message === "Correct password") {
          this.password = "";
          this.showConfirm = false;
          this.sendRequest();
        } else {
          this.alertError("รหัสผ่านไม่ถูกต้อง");
          this.showConfirm = false;
        }
      } catch (error) {
        alert(error);
      }
    },
    getId() {
      return this.$store.getters["auth/getId"];
    },
    toggleShowModalConfirm() {
      this.showConfirm = !this.showConfirm;
      this.password = "";
    },
    async getBalance() {
      const res = await api.get("/totalsolduser/balance/" + this.getId());
      this.balance = res.data.balance;
      this.idAccount = res.data.idAccount;
      this.bankAccount = res.data.bankAccount;
    },
    showAlert(text) {
      this.$swal({
        scrollbarPadding: false,
        confirmButtonColor: "#00af70",
        allowOutsideClick: false,
        width: "500",
        text: text,
        icon: "success",
        confirmButtonText: "OK",
      });
    },
    alertError(text) {
      this.$swal({
        scrollbarPadding: false,
        confirmButtonColor: "#00af70",
        allowOutsideClick: false,
        width: "500",
        text: text,
        icon: "error",
        button: "OK",
      });
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
        this.getBalance();
      }
    }
  },
  async created() {
    this.socket = io(this.socketioURL, {
      transports: ["websocket", "polling"],
    });
    this.socket.on("requestpayment-rejected", () => {
      if (this.isLogin) {
        this.getBalance();
      }
    });
  },
};
</script>

<style scoped>
.btn-bg {
  background-color: #0008c1;
}
.center-loading {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
}
.center {
  display: flex;
  justify-content: center;
  align-items: center;
}
.text-color {
  color: #ffff;
}
</style>
