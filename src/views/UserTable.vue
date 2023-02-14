<template>
  <v-table density="compact">
    <thead class="table">
      <tr>
        <th class="text-left">Name</th>
        <th class="text-left">Userame</th>
        <th class="text-left">Email</th>
        <th class="text-left">Gender</th>
        <th class="text-left"></th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(item, index) in userItems" :key="index">
        <td class="mt-2">{{ item.name }}</td>
        <td class="mt-2">{{ item.username }}</td>
        <td class="mt-2">{{ item.email }}</td>
        <td class="mt-2">{{ item.gender }}</td>

        <td class="d-flex justify-center mt-2">
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
import api from "@/services/api";

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
      api.delete("/users/" + user._id, user).then((result) => {
        this.userItems = result.data;
        this.fetchApi();
      });
    },
    editUser(user) {
      this.$router.push(`/usertable/${user._id}`);
    },
    updateUser(updatedUser) {
      api.put("/users/" + updatedUser._id, updatedUser).then((result) => {
        this.userItems = result.data;
        this.fetchApi();
      });
      this.showForm = false;
    },
    fetchApi() {
      api.get("/users/").then((result) => {
        for (let i = 0; i < result.data.length; i++) {
          let isAdmin = false;
          for (let j = 0; j < result.data[i].roles.length; j++) {
            if (
              result.data[i].roles[j] === "ADMIN" ||
              result.data[i].roles[j] === "LOCAL_ADMIN"
            ) {
              isAdmin = true;
              break;
            }
          }
          if (!isAdmin) {
            this.userItems.push(result.data[i]);
          }
        }
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