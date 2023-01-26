<template>
  <v-app-bar :elevation="10" rounded color="#00af70"></v-app-bar>
  <v-navigation-drawer
    v-model="drawer"
    :rail="rail"
    permanent
    @click="rail = false"
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
        prepend-icon="mdi-account"
        title="รายชื่อแอดมิน"
        value="account"
        @click="goToAdminTable()"
      ></v-list-item>
      <v-list-item
        prepend-icon="mdi-account-group-outline"
        title="รายชื่อผู้ใช้งาน"
        value="users"
        @click="goToUserTable()"
      ></v-list-item>
      <v-list-item
        prepend-icon="mdi-view-dashboard"
        title="รายการคำร้อง"
        value="users"
        @click="goToUserTable()"
      ></v-list-item>
      <!-- <v-list-item
        prepend-icon="mdi-account-group-outline"
        title="ประวัติ"
        value="users"
        @click="goToUserTable()"
      ></v-list-item> -->
    </v-list>

    <template v-slot:append>
    <div class="pa-2">
      <v-btn rounded variant="text" @click="logout"> Logout </v-btn>
    </div>
  </template>
  </v-navigation-drawer>

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
        { title: "Admins", icon: "mdi-account", path: "/usertable" },
        {
          title: "Users",
          icon: "mdi-account-group-outline",
          path: "/usertable",
        },
      ],
      rail: true,
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
    logout() {
      this.loading = true;
      setTimeout(() => {
        this.$store.dispatch("auth/logout");
        this.loading = false;
      }, 2000);
    },
  },
};
</script>