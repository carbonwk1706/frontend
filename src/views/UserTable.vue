<template>
  <v-table density="compact">
    <thead>
      <tr>
        <th class="text-left">Name</th>
        <th class="text-left">Userame</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(item, index) in userItems" :key="index">
        <td>{{ item.name }}</td>
        <td>{{ item.username }}</td>
        <td >
         <v-btn color="success" @click="editUser(item)">แก้ไข</v-btn>
          <v-btn color="error" @click="deleteUser(item)">ลบ</v-btn>
        </td>
      </tr>
    </tbody>
  </v-table>
</template>

<script>

import axios from 'axios';

export default {
  components: {

  },
  data() {
    return {
      userItems: [],
      selectedUser: {},
      showForm: false
    };
  },
  methods: {
      deleteUser(user){
           axios.delete('http://localhost:3000/users/' + user._id, user)
          .then(
            (result)=>{
              this.userItems = result.data;
              this.fetchApi()
            }
          )
      },
      editUser(user) {
        this.$router.push(`/usertable/${user._id}`);
      },
      updateUser(updatedUser) {
        axios.put('http://localhost:3000/users/' + updatedUser._id, updatedUser)
        .then(
          (result)=>{
            this.userItems = result.data;
            this.fetchApi()
          }
        )
        this.showForm = false
      },
      fetchApi(){
        axios.get('http://localhost:3000/users').then(
        (result)=>{
          this.userItems = result.data;
          console.log(this.userItems)
        }
      )
      }
  },
  mounted() {
      this.fetchApi()
  },
};
</script>

<style >
.left {
  display: flex;
  justify-content: left;
  align-items: center;
}
</style>