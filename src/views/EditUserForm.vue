<template>
  <v-card>
    <v-form  ref="form" v-model="valid" :lazy-validation="lazy">
      <v-container>
        <v-row>
          <v-col>
            <v-text-field
              label="Name"
              v-model="userItems.name"
              :rules="nameRule"
            />
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <v-text-field
              label="Username"
              v-model="userItems.username"
              :rules="usernameRule"

            />
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <v-text-field
              label="Email"
              v-model="userItems.email"
              :rules="emailRule"
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
              :items="genderItem"
            />
          </v-col>
        </v-row>
        <v-row>
          <v-col class="text-center">
            <v-btn color="success" rounded @click="submit">Accept</v-btn>
          </v-col>
          <v-col class="text-center">
            <v-btn color="Grey" rounded @click="submit">Back</v-btn>
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
        usernameRule: [
        (v) => !!v || "กรุณากรอก username",
        (v) => !/[ ]/.test(v) || "ห้ามเว้นวรรค",
        (v) =>
          /^[a-zA-Z0-9]+$|^[ก-๛0-9]+$/.test(v) ||
          "ชื่อต้องเป็นภาษาอังกฤษหรือภาษาไทยเท่านั้น และ ห้ามภาษาอังกฤษผสมภาษาไทย",
        (v) =>
          (v && v.length >= 4 && v.length <= 32) ||
          "ระบุอย่างน้อย 4 ตัวอักษร และน้อยกว่า 15 ตัวอักษร",
        ],
        nameRule:[
        (v) => !!v || "กรุณากรอกชื่อเล่น",
        (v) => !/[ ]/.test(v) || "ห้ามเว้นวรรค",
        (v) =>
          /^[a-zA-Z0-9]+$|^[ก-๛0-9]+$/.test(v) ||
          "ชื่อต้องเป็นภาษาอังกฤษหรือภาษาไทยเท่านั้น และ ห้ามภาษาอังกฤษผสมภาษาไทย",
        (v) =>
          (v && v.length >= 4 && v.length <= 32) ||
          "ระบุอย่างน้อย 4 ตัวอักษร และน้อยกว่า 15 ตัวอักษร",
        ],
        genderItem:['Male', 'Female', 'Other'],
        emailRule:[
        (v) => !!v || "กรุณากรอก Email",
        (v) => !/[ ]/.test(v) || "ห้ามเว้นวรรค",
        (v) => /.+@.+\..+/.test(v) || "E-mail must be valid",
        ],

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