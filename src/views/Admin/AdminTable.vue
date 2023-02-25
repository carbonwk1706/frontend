<template>
  <v-container fluid>
    <v-row class="mb-3">
      <v-col cols="12" class="text-start">
        <h2>รายการชื่อแอดมิน</h2>
      </v-col>
    </v-row>
    <v-table v-if="userItems.length > 0" dense class="elevation-1">
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
        <tr
          v-for="(item, index) in userItems.slice(
            (page - 1) * itemsPerPage,
            page * itemsPerPage
          )"
          :key="index"
        >
          <td>{{ item.name }}</td>
          <td>{{ item.username }}</td>
          <td>{{ item.email }}</td>
          <td>{{ item.gender }}</td>
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
    <v-row v-else>
      <v-divider class="mb-6"></v-divider>
      <v-col cols="12">
        <div class="d-flex justify-center">
          <img
            src="https://www.mebmarket.com/web/dist/assets/images/imgMebcatMebphone@2x.png"
            width="200"
            height="200"
          />
        </div>
        <div class="text-noRequest text-center">
          <p>ขออภัยด้วยนะครับ</p>
        </div>
        <div class="text-center mt-3">
          <p class="text-muted">ไม่พบข้อมูลในหัวข้อที่คุณกำลังชมค่ะ</p>
        </div>
      </v-col>
    </v-row>
    <v-row v-if="userItems.length > 0" class="mt-12">
      <v-col cols="12" class="pa-0">
        <v-pagination
          class="text-pagination"
          v-model="page"
          :length="pages"
          circle
        ></v-pagination>
      </v-col>
    </v-row>

    <v-dialog v-model="showConfirm" max-width="290">
      <v-card>
        <v-card-title class="headline">ยืนยันการลบ</v-card-title>
        <v-card-text>
          คุณต้องการลบผู้ใช้ {{ selectedUser.name }} ใช่หรือไม่?
        </v-card-text>
        <v-card-actions>
          <v-spacer />
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
  data() {
    return {
      userItems: [],
      selectedUser: {},
      page: 1,
      itemsPerPage: 10,
      showForm: false,
      showConfirm: false,
    };
  },
  methods: {
    getId() {
      return this.$store.getters["authAdmin/getId"];
    },
    async deleteUser(user) {
      try {
        await api.delete("/users/" + user._id, user);
        this.showAlert();
        this.userItems = this.userItems.filter((item) => item._id !== user._id);
      } catch (error) {
        console.error(error);
      }
      this.fetchApi();
    },
    editUser(user) {
      this.$router.push(`/admintable/${user._id}`);
    },
    updateUser(updatedUser) {
      api.put("/users/" + updatedUser._id, updatedUser).then((result) => {
        this.userItems = result.data;
        this.fetchApi();
      });
      this.showForm = false;
    },
    async fetchApi() {
      const result = await api.get("/users/");
      this.userItems.splice(0, this.userItems.length);
      for (let i = 0; i < result.data.length; i++) {
        for (let j = 0; j < result.data[i].roles.length; j++) {
          if (
            result.data[i].roles[j] === "ADMIN" ||
            result.data[i].roles[j] === "LOCAL_ADMIN"
          ) {
            if(result.data[i]._id !== this.getId()){
              this.userItems.push(result.data[i]);
            break;
            }
          }
        }
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
  computed: {
    pages() {
      return Math.ceil(this.userItems.length / this.itemsPerPage);
    },
    isLogin() {
      return this.$store.getters["authAdmin/isLogin"];
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
  background-color: #00af70;
}
</style>
