<template>
  <h1 class="text-center">Home</h1>
</template>

<script>
api;
import api from "../services/api";
import { defineComponent } from "vue";

// Components

export default defineComponent({
  name: "HomeView",
  methods: {
    getUsers() {
      api.get("http://localhost:3000/users").then(
        function (response) {
          console.log(response);
        }.bind(this)
      );
    },
  },
  mounted() {
    this.getUsers();
  },
});
</script>
