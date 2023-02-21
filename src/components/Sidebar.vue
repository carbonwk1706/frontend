<template>
  <div class="d-flex flex-sm-column">
    <v-app-bar :elevation="10" rounded color="#00af70"></v-app-bar>

    <v-navigation-drawer
      v-model="drawer"
      :rail="rail"
      permanent
      @click="rail = false"
      :responsive="true"
      :style="{ 'max-width': '100%' }"
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
          v-if="!isAdmin"
          prepend-icon="mdi-account"
          title="รายชื่อแอดมิน"
          value="admin"
          @click="goToAdminTable()"
          dense
          nav
          :style="{ 'max-width': '100%' }"
        ></v-list-item>
        <v-divider inset></v-divider>
        <v-list-item
          prepend-icon="mdi-account-group-outline"
          title="รายชื่อผู้ใช้งาน"
          value="users"
          @click="goToUserTable()"
          dense
          nav
          :style="{ 'max-width': '100%' }"
        ></v-list-item>
        <v-divider inset></v-divider>
        <v-list-item
          prepend-icon="mdi-view-dashboard"
          title="รายการคำร้อง"
          value="approve"
          @click="goToApproveTable()"
          dense
          nav
          :style="{ 'max-width': '100%' }"
        ></v-list-item>
        <v-divider inset></v-divider>
        <v-list-item
          prepend-icon="mdi-history"
          title="ประวัติ"
          value="history"
          @click="goToHistoryTable()"
          dense
          nav
          :style="{ 'max-width': '100%' }"
        ></v-list-item>
        <v-divider inset></v-divider>
        <v-list-item
          prepend-icon="mdi-history"
          title="book"
          value="books"
          @click="goToBookTable()"
          dense
          nav
          :style="{ 'max-width': '100%' }"
        ></v-list-item>
        <v-divider inset></v-divider>
        <v-list-item
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
      isAdmin: false,
    };
  },
  computed: {},
  methods: {
    toggleRail() {
      this.rail = !this.rail;
    },
    goToUserTable() {
      router.push("/usertable");
    },
    goToAdminTable() {
      router.push("/admintable");
    },
    goToApproveTable() {
      router.push("/approvetable");
    },
    goToHistoryTable() {
      router.push("/historyadmin");
    },
    goToBookTable() {
      router.push("/bookadmin");
    },
    logout() {
      this.loading = true;
      setTimeout(() => {
        this.$store.dispatch("authAdmin/logout");
        this.loading = false;
      }, 500);
    },
  },
  mounted() {
    this.isAdmin = this.$store.getters.isAdmin;
  },
};
</script>
