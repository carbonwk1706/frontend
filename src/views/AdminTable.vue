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
            @click="showConfirm = true; selectedUser = item"
            >ลบ</v-btn
          >
        </td>
      </tr>
    </tbody>
  </v-table>

  <v-dialog v-model="showConfirm" max-width="290">
    <v-card>
      <v-card-title class="headline">ยืนยันการลบ</v-card-title>
      <v-card-text>
        คุณต้องการลบผู้ใช้ {{ selectedUser.name }} ใช่หรือไม่?
      </v-card-text>
      <v-card-actions>
        <v-spacer />
        <v-btn color="Grey" text @click="showConfirm = false">
          ยกเลิก
        </v-btn>
        <v-btn color="red darken-1" text @click="deleteUser(selectedUser); showConfirm = false">
          ลบ
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
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
      showConfirm: false,
    };
  },
  methods: {
    deleteUser(user) {
      api
        .delete("/users/" + user._id, user)
        .then((result) => {
          this.userItems = result.data;
          this.fetchApi();
        });
    },
    editUser(user) {
      this.$router.push(`/usertable/${user._id}`);
    },
    updateUser(updatedUser) {
      api
        .put("/users/" + updatedUser._id, updatedUser)
        .then((result) => {
          this.userItems = result.data;
          this.fetchApi();
        });
      this.showForm = false;
    },
    async fetchApi() {
      api
        .get("/users/")
        .then((result) => {

          for(let i = 0 ;i<result.data.length; i++ ){
            console.log(result.data[i].roles.length)
            for(let j = 0 ; j<result.data[i].roles.length;j++){

              console.log(result.data[i].roles[j])
              if(result.data[i].roles[j] === "ADMIN" ||result.data[i].roles[j] === "LOCAL_ADMIN" )
              {
                this.userItems.push(result.data[i])
                break;
              }

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