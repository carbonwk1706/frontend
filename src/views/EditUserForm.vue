<template>
    <v-form>
      <v-container>
        <v-row>
          <v-col>
            <v-text-field
              label="Name"
              v-model="userItems.name"
            />
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <v-text-field
              label="Username"
              v-model="userItems.username"
            />
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <v-text-field
              label="Email"
              v-model="userItems.email"
            />
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <v-select
              label="Gender"
              v-model="userItems.gender"
              :items="['Male', 'Female', 'Other']"
            />
          </v-col>
        </v-row>
        <v-row>
          <v-col class="text-center">
            <v-btn color="success" rounded @click="submit">Accept</v-btn>
          </v-col>
        </v-row>
      </v-container>
    </v-form>
  </template>
  <script>

  import axios from 'axios';

  export default {
    name: "EditUser",
    data() {
      return {
        userItems: [],
      };
    },
    methods: {
      changeStatus() {
        this.status = !this.status
        alert(this.status)
      },
    },
    mounted() {
    axios.get("http://localhost:3000/users/" + this.$route.params.id).then((result) => {
      this.userItems = result.data;
      console.log(this.userItems);
    });
  },
  };
  </script>

  <style scoped>
  .headerName {
    display: flex;
    justify-content: center;
    margin-bottom: 30px;
    font-size: 36px;
    font-weight: bold;
  }

  .description {
    font-size: 20px;
    font-weight: 500;
    margin-bottom: 30px;
  }
  </style>