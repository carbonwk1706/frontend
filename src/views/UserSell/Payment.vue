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
              <span>0.00</span>
            </v-col>
            <v-col cols="6" class="d-flex justify-end">
              <span>บัญชีธนาคาร:</span>
            </v-col>
            <v-col cols="6" class="d-flex justify-start">
              <span>###########</span>
            </v-col>
          </v-row>

          <v-col cols="12">
            <v-row class="d-flex justify-center">
              <v-col cols="12" class="d-flex justify-start">
                <span>จำนวนเงิน:</span>
              </v-col>
              <v-col cols="12" class="d-flex justify-start">
                <v-text-field
                  v-model="amount"
                  :rules="amountRule"
                  label="ถอนเงินขั้นตํ่า 100 บาท"
                />
              </v-col>
            </v-row>
          </v-col>
          <v-col cols="12" class="d-flex justify-center">
            <v-btn
              color="success"
              class="mt-5"
              rounded
              variant="flat"
              @click="showModalConfirm"
            >
              <span class="font-text">รับเงิน</span>
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

  computed: {
    isLogin() {
      return this.$store.getters["auth/isLogin"];
    },
  },
  data() {
    return {
      amount: 0,
      showConfirm: false,
      isVisible: false,
      visible: false,
      password: "",

      amountRule: [
        (v) => !!v || "กรุณาใส่จำนวนเงิน",
        (v) => v >= 100 || "จำนวนเงินต้องมากกว่าหรือเท่ากับ 100 บาท",
      ],
    };
  },
  methods: {
    async confirmPassword() {
      try {
        const response = await api.post("/confirmPassword", {
          id: this.getId(),
          password: this.password,
        });
        if (response.data.message === "Correct password") {
          this.password = "";
          this.showConfirm = false;
          this.showAlert("กรุณารอการอนุมัติเงินภายใน 24 ชั่วโมง");
        } else {
          this.alertError("รหัสผ่านไม่ถูกต้อง");
          this.showConfirm = false;
        }
      } catch (error) {
        console.log(error);
      }
    },
    getId() {
      return this.$store.getters["auth/getId"];
    },
    async showModalConfirm() {
      this.showConfirm = true;
    },
    toggleShowModalConfirm() {
      this.showConfirm = !this.showConfirm;
      this.password = "";
    },
    async fetchApi() {
      const res = await api.get("/profile/" + this.getId());
      this.user = res.data.user;
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
  mounted() {
    this.fetchApi();
  },
};
</script>

<style>
.btn-bg {
  background-color: #00af70;
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
.font-color {
  font-size: 18px;
}
</style>
