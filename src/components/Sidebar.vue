<template>
  <v-app-bar color="green" prominent></v-app-bar>
  <v-navigation-drawer class="deep-purple accent-4" dark permanent>
    <v-list>
      <v-list-item
        v-for="item in items"
        :key="item.title"
        @click="goTo(item.path)"
      >
      <v-list-item-group></v-list-item-group>
        <v-list-item-icon>
          <v-icon >{{ item.icon }}</v-icon>
        </v-list-item-icon>

        <v-list-item-content>
          <v-list-item-title>{{ item.title }}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>

    <template v-slot:append>
      <div class="pa-2">
        <v-btn block> Logout </v-btn>
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
      items: [
        { title: "Dashboard", icon: "mdi-view-dashboard", path: "/usertable" },
        { title: "Account", icon: "mdi-account-box" },
        { title: "Admin", icon: "mdi-gavel" },
      ],
    };
  },
  methods: {
    goTo(path) {
      this.drawer = false;
      router.push(path);
    },
  },
};
</script>
<style >


</style>