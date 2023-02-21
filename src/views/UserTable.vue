<template>
  <v-container fluid>
    <v-row>
      <v-col cols="12" class="overflow-x-auto">
        <v-table dense class="elevation-1" v-scroll-x style="max-width: 100%">
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
                    @click="
                      showConfirm = true;
                      selectedUser = item;
                    "
                    >ลบ</v-btn
                  >
                </td>
              </tr>
            
          </tbody>
        </v-table>
      </v-col>
    </v-row>

    <v-dialog
      v-model="showConfirm"
      persistent
      style="z-index: 900"
      :center="true"
      max-width="500"
      :padding="20"
    >
      <v-card>
        <v-card-title class="headline text-center">ยืนยันการลบ</v-card-title>
        <v-card-text class="text-center">
          คุณต้องการลบผู้ใช้ {{ selectedUser.name }} ใช่หรือไม่?
        </v-card-text>
        <v-card-actions class="text-center">
          <v-btn color="Grey" text @click="showConfirm = false"> ยกเลิก </v-btn>
          <v-btn
            color="red darken-1"
            text
            @click="
              deleteUser(selectedUser);
              showConfirm = false;
            "
          >
            ลบ
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
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
    async deleteUser(user) {
      try {
        await api.delete("/users/" + user._id, user);
        this.showAlert();
        this.fetchApi();
      } catch (error) {
        console.error(error);
      }
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
    async fetchApi() {
      try {
        const result = await api.get("/users/");
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
        console.log(this.userItems);
      } catch (error) {
        console.error(error);
      }
    },
    showAlert() {
      this.$swal({
        scrollbarPadding: false,
        confirmButtonColor: "#00af70",
        customClass: "show-modal",
        text: "ลบผู้ใช้งานสำเร็จ",
        icon: "success",
        allowOutsideClick: false,
        confirmButtonText: "OK",
      });
    },
  },

  mounted() {
    this.fetchApi();
  },
};
</script>

<style>
.left {
  display: flex;
  justify-content: left;
  align-items: center;
}

.table {
  background-color: rgb(54, 233, 108);
}

.text-center {
  display: flex;
  justify-content: center;
}

.v-responsive__content {
  max-width: 100%;
}

.v-data-table__wrapper {
  overflow-x: auto;
  width: 100%;
}

@media (max-width: 600px) {
  .text-left {
    text-align: center !important;
  }
  .d-flex.justify-center {
    justify-content: center !important;
  }
  .mr-3 {
    margin-right: 0 !important;
    margin-bottom: 8px !important;
  }
}
</style>
