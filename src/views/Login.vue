<template>
  <v-dialog v-model="isVisible" style="z-index: 900" width="500px" persistent>
    <v-sheet>
      <v-card class="mx-auto px-6 py-8">
        <v-form @submit.prevent="login">
          <div class="d-flex justify-end pa-0">
            <v-icon @click="hideLogin">mdi-close</v-icon>
          </div>
          <v-card-title primary-title class="text-center">
            ล็อกอินเข้าระบบ
          </v-card-title>
          <v-divider></v-divider>
          <v-container>
            <v-text-field
              label="Username"
              prepend-inner-icon="mdi-account-outline"
              variant="outlined"
              class="mb-2"
              required
              v-model="form.username"
              :rules="usernameRules"
            ></v-text-field>
            <v-text-field
              :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'"
              @click:append-inner="visible = !visible"
              label="Password"
              prepend-inner-icon="mdi-lock-outline"
              variant="outlined"
              class="mb-2"
              :type="visible ? 'text' : 'password'"
              required
              v-model="form.password"
              :rules="passwordRules"
            ></v-text-field>
            <div class="center">
              <v-hover>
                <template v-slot:default="{ isHovering, props }">
                  <v-btn
                    v-bind="props"
                    class="rounded-pill"
                    type="submit"
                    color="success"
                    size="large"
                    :variant="isHovering ? 'outlined' : 'elevated'"
                    >ล็อกอินเข้าระบบ</v-btn
                  >
                </template>
              </v-hover>
            </div>
          </v-container>
          <v-card-actions class="center">
            <span class="mr-2">หากยังไม่สมัครบัญชีโปรด</span>
            <v-btn
              class="rounded-pill"
              variant="outlined"
              color="grey"
              @click="goToRegister"
            >
              <span style="color: black"> สมัครสมาชิก</span>
            </v-btn>
          </v-card-actions>
        </v-form>
      </v-card>
    </v-sheet>
  </v-dialog>

  <Register
    :registerModal="registerModal"
    @update:isVisible="registerModal = $event"
  />

  <v-dialog v-model="loading" max-width="500" persistent>
    <v-card>
      <v-card-title class="center">
        <div class="img-size">
          <v-img
            src="https://media.tenor.com/M00Zqk6Dx7EAAAAi/peachcat-goma.gif"
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
      <v-card-text class="text-center">กำลังเข้าสู่ระบบ</v-card-text>
    </v-card>
  </v-dialog>
</template>
<script>
import api from "@/services/api";
import Register from "./Register.vue";
import router from "@/router";

export default {
  components: {
    Register,
  },
  props: {
    visibleModal: {
      type: Boolean,
      required: true,
    },
  },
  data() {
    return {
      isVisible: false,
      visible: false,
      registerModal: false,
      form: {
        username: "",
        password: "",
      },
      loading: false,
      usernameRules: [(v) => !!v || "กรุณากรอก Username"],
      passwordRules: [(v) => !!v || "กรุณากรอก Password"],
    };
  },
  methods: {
    async login() {
      if (!this.form.username && !this.form.password) {
        this.showAlert("กรุณากรอก Username และ Password ด้วยจ้า");
      } else if (!this.form.username) {
        this.showAlert("กรุณากรอก Username ด้วยจ้า");
      } else if (!this.form.password) {
        this.showAlert("กรุณากรอก Password ด้วยจ้า");
      } else {
        try {
          const res = await api.post("/auth/login", {
            username: this.form.username,
            password: this.form.password,
          });
          if (
            res.status === 200 &&
            res.data.message !== "Invalid username or password"
          ) {
            this.loading = true;
            const user = res.data.user;
            const token = res.data.token;
            localStorage.setItem("token", token);
            localStorage.setItem("user", JSON.stringify(user));
            setTimeout(() => {
              this.$store.dispatch("auth/login", user);
              this.loading = false;
              this.hideLogin();
            }, 2000);
            setTimeout(() => {
              router.push("/")
            }, 2000);
          } else {
            this.alertLogin();
          }
        } catch (error) {
          this.alertLogin();
        }
      }
    },
    toggleModalRegister() {
      this.registerModal = !this.registerModal;
    },
    goToRegister() {
      this.hideLogin();
      this.toggleModalRegister();
    },
    alertLogin() {
      this.$swal({
        scrollbarPadding: false,
        confirmButtonColor: "#00af70",
        allowOutsideClick: false,
        width: "500",
        text: "Username หรือ Password ไม่ถูกต้อง ! ",
        icon: "error",
        button: "OK",
      });
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
    hideLogin() {
      this.$emit("update:isVisible", false);
      setTimeout(() => {
        this.resetForm();
      }, 500);
    },
    resetForm() {
      this.form.username = "";
      this.form.password = "";
    },
  },
  watch: {
    visibleModal() {
      this.isVisible = this.$props.visibleModal;
    },
  },
  mounted() {
    this.$emit("update:isVisible", false);
  },
};
</script>
<style scoped>
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
.img-size {
  width: 100px;
}

</style>
