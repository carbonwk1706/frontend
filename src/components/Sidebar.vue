<template>
  <div class="d-flex flex-sm-column">
    <v-app-bar
      :elevation="10"
      :style="{ background: 'linear-gradient(to right, #0008C1, #2146C7)' }"
    >
      <div class="font-text-sidebar ml-5">EBOOK-ADMIN</div>
    </v-app-bar>
    <v-navigation-drawer
      v-model="drawer"
      :rail="rail"
      permanent
      @click="rail = false"
      :responsive="true"
      style="z-index: 800;"
      max-width="100%"
    >
      <v-list-item nav>
        <template v-slot:append>
          <v-btn
            variant="text"
            :icon="rail ? 'mdi-chevron-right' : 'mdi-chevron-left '"
            @click.stop="toggleRail"
          ></v-btn>
        </template>
      </v-list-item>

      <v-divider></v-divider>

      <v-list density="compact" nav>
        <v-list-item
          v-if="local_admin"
          prepend-icon="mdi-home-circle"
          title="หน้าแรก"
          value="home"
          @click="goToHome()"
          dense
          nav
          :style="{ 'max-width': '100%' }"
        ></v-list-item>
        <v-divider inset v-if="local_admin"></v-divider>
        <v-list-item
        v-if="local_admin"
        prepend-icon="mdi-image-edit"
        title="แก้ไขรูปภาพ"
        value="image"
        @click="goToCarousel()"
        dense
        nav
        :style="{ 'max-width': '100%' }"
      ></v-list-item>
      <v-divider inset v-if="local_admin"></v-divider>
        <v-list-item
          v-if="admin"
          prepend-icon="mdi-account"
          title="รายชื่อแอดมิน"
          value="admin"
          @click="goToAdminTable()"
          dense
          nav
          :style="{ 'max-width': '100%' }"
        ></v-list-item>
        <v-divider inset v-if="admin"></v-divider>
        <v-list-item
          v-if="admin"
          prepend-icon="mdi-account-group-outline"
          title="รายชื่อผู้ใช้งาน"
          value="users"
          @click="goToUserTable()"
          dense
          nav
          :style="{ 'max-width': '100%' }"
        ></v-list-item>
        <v-list-item
          v-if="local_admin"
          prepend-icon="mdi-book-multiple"
          title="หนังสือที่วางขาย"
          value="books"
          @click="goToBookTable()"
          dense
          nav
          :style="{ 'max-width': '100%' }"
        ></v-list-item>
        <v-divider inset v-if="local_admin"></v-divider>
        <v-list-item
          v-if="local_admin"
          prepend-icon="mdi-view-dashboard"
          title="รายการคำร้อง"
          value="approve"
          @click="goToApproveTable()"
          dense
          nav
          :style="{ 'max-width': '100%' }"
        ></v-list-item>
        <v-divider inset v-if="local_admin"></v-divider>
        <v-list-item
          v-if="local_admin"
          prepend-icon="mdi-history"
          title="ประวัติรายการคำร้อง"
          value="historyrequest"
          @click="goToHistoryTable()"
          dense
          nav
          :style="{ 'max-width': '100%' }"
        ></v-list-item>
        <v-divider inset v-if="admin"></v-divider>
        <v-list-item
          v-if="admin"
          prepend-icon="mdi-account-clock"
          title="ประวัติการจัดการผู้ใช้"
          value="historyuser"
          @click="goToUserHistoryTable()"
          dense
          nav
          :style="{ 'max-width': '100%' }"
        ></v-list-item>
        <v-divider inset v-if="local_admin"></v-divider>
        <v-list-item
          v-if="local_admin"
          prepend-icon="mdi-book-clock"
          title="ประวัติการจัดการหนังสือ"
          value="historybook"
          @click="goToBookHistory()"
          dense
          nav
          :style="{ 'max-width': '100%' }"
        ></v-list-item>
        <v-divider inset v-if="isLogin"></v-divider>
        <v-list-item
          v-if="isLogin"
          prepend-icon="mdi-exit-to-app"
          title="ออกจากระบบ"
          value="logout"
          @click="logout"
          dense
          nav
          :style="{ 'max-width': '100%' }"
        ></v-list-item>
      </v-list>
    </v-navigation-drawer>
  </div>
</template>
<script>
import api from "@/services/api";
import router from "../router";

export default {
  drawer: false,
  data() {
    return {
      drawer: true,
      items: [
        { title: "Home", icon: "mdi-home-city", path: "/admin" },
        { title: "Admins", icon: "mdi-account", path: "/admintable" },
        {
          title: "Users",
          icon: "mdi-account-group-outline",
          path: "/usertable",
        },
      ],
      rail: true,
      user: [],
      admin: false,
      local_admin: false,
    };
  },
  methods: {
    toggleRail() {
      this.rail = !this.rail;
    },
    goToBookHistory() {
      router.push("/historybookcrud").then(() => {
        window.scrollTo(0, 0);
      });
    },
    goToUserTable() {
      router.push("/usertable").then(() => {
        window.scrollTo(0, 0);
      });
    },
    goToAdminTable() {
      router.push("/admintable").then(() => {
        window.scrollTo(0, 0);
      });
    },
    goToApproveTable() {
      router.push("/approvetable").then(() => {
        window.scrollTo(0, 0);
      });
    },
    goToHistoryTable() {
      router.push("/historyadmin").then(() => {
        window.scrollTo(0, 0);
      });
    },
    goToUserHistoryTable() {
      router.push("/userhistoryadmin").then(() => {
        window.scrollTo(0, 0);
      });
    },
    goToBookTable() {
      router.push("/bookadmin").then(() => {
        window.scrollTo(0, 0);
      });
    },
    goToHome() {
      router.push("/admin").then(() => {
        window.scrollTo(0, 0);
      });
    },
    goToCarousel(){
      router.push("/carousel").then(() => {
        window.scrollTo(0, 0);
      });
    },
    logout() {
      this.loading = true;
      setTimeout(() => {
        this.$store.dispatch("authAdmin/logout");
        this.loading = false;
      }, 500);
    },
    getId() {
      return this.$store.getters["authAdmin/getId"];
    },
    async fetchApi() {
      const res = await api.get("/checkRoles/" + this.getId());
      this.user = res.data.user;
      if (this.hasAdminRole) {
        this.admin = true;
      } else {
        this.local_admin = true;
      }
    },
  },
  computed: {
    isLogin() {
      return this.$store.getters["authAdmin/isLogin"];
    },
    hasAdminRole() {
      return this.user.roles.includes("ADMIN");
    },
    hasLocalAdminRole() {
      return this.user.roles.includes("LOCAL_ADMIN");
    },
  },
  mounted() {
    if (this.isLogin) {
      this.fetchApi();
    }
  },
};
</script>
