<template>
  <v-table density="compact">
    <thead class="table">
      <tr>
        <th class="text-left">Name</th>
        <th class="text-left">Userame</th>
        <th class="text-left">Email</th>
        <th class="text-left">Gender</th>
        <th class="text-left">Role</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(item, index) in userItems" :key="index">
        <td>{{ item.name }}</td>
        <td>{{ item.username }}</td>
        <td>{{ item.email }}</td>
        <td>{{ item.gender }}</td>
        <td>{{ item.roles }}</td>
        <td>
          <v-btn
            variant="flat"
            color="success"
            class="mr-3"
            @click="editUser(item)"
            >แก้ไข</v-btn
          >
          <v-btn
            variant="flat"
            color="error"
            class="mr-3"
            @click="deleteUser(item)"
            >ลบ</v-btn
          >
        </td>
      </tr>
    </tbody>
  </v-table>
</template>

<script>
import axios from "axios";

export default {
  components: {},
  data() {
    return {
      userItems: [],
      selectedUser: {},
      showForm: false,
    };
  },
  methods: {
    deleteUser(user) {
      axios
        .delete("http://localhost:3000/users/" + user._id, user)
        .then((result) => {
          this.userItems = result.data;
          this.fetchApi();
        });
    },
    editUser(user) {
      this.$router.push(`/usertable/${user._id}`);
    },
    updateUser(updatedUser) {
      axios
        .put("http://localhost:3000/users/" + updatedUser._id, updatedUser)
        .then((result) => {
          this.userItems = result.data;
          this.fetchApi();
        });
      this.showForm = false;
    },
    fetchApi() {
      axios.get("http://localhost:3000/users").then((result) => {
        this.userItems = [];
        result.data.forEach((user) => {
          if (["ADMIN", "LOCAL_ADMIN"].includes(user.roles)) {
            this.userItems.push(user);
          }
        });
        console.log("TestResult",result.data);
        console.log("TestUserItem",this.userItems);
      });
    },
  },
  mounted() {
    this.fetchApi();
  },
};
</script>

<style >
.left {
  display: flex;
  justify-content: left;
  align-items: center;
}

.table {
  background-color: rgb(54, 233, 108);
}
</style>