<template>
  <v-card>
    <v-form  ref="form" v-model="valid" :lazy-validation="lazy">
      <v-container>
        <v-row>
          <v-col>
            <v-text-field
              label="Name"
              v-model="userItems.name"
              :rules="[v => !!v || 'Name is required']"
            />
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <v-text-field
              label="Username"
              v-model="userItems.username"
              :rules="[v => !!v || 'Username is required']"

            />
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <v-text-field
              label="Email"
              v-model="userItems.email"
              :rules="[v => !!v || 'Email is required']"
            />
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <v-text-field
              label="Password"
              v-model="userItems.password"
              :rules="[v => !!v || 'Password is required']"
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
  </v-card>
  </template>
  <script>

  import axios from 'axios';


  export default {
    name: "EditUser",
    data() {
      return {

        valid: false,
        lazy: false,
        userItems: [],
      };
    },
    methods: {
      changeStatus() {
        this.status = !this.status
        alert(this.status)
      },
      alertvalidate(){

      },
      submit() {
      this.$refs.form.validate().then(valid => {
        if (valid) {
          axios.put("http://localhost:3000/users/" + this.$route.params.id, this.userItems).then(() => {
            this.$router.push("/usertable");
          })
          ;
        }
      });
    }
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