<template>
  <v-container fluid>
    <v-row class="mb-3">
      <v-col cols="12" class="text-start">
        <h2>รายชื่อแอดมิน</h2>
      </v-col>
    </v-row>

    <div class="text-end">
      <v-btn color="blue-grey" class="mb-3" @click="addAdmin"
        >เพิ่มแอดมิน</v-btn
      >
    </div>
    <v-table v-if="userItems.length > 0" dense class="elevation-1">
      <thead class="table">
        <tr>
          <th class="text-left"><span class="text-color">Name</span></th>
          <th class="text-left"><span class="text-color">Username</span></th>
          <th class="text-left"><span class="text-color">Email</span></th>
          <th class="text-left"><span class="text-color">Gender</span></th>
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
            <v-btn variant="flat" class="mr-3 btn-edit" @click="editUser(item)"
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

    <v-dialog v-model="showConfirm" max-width="450">
      <v-card>
        <v-card-title class="headline text-center">ยืนยันการลบ</v-card-title>
        <v-card-text class="text-center">
          คุณต้องการลบผู้ใช้ {{ selectedUser.name }} ใช่หรือไม่?
        </v-card-text>
        <v-card-actions class="d-flex justify-center">
          <v-btn
            class="btn-confirm"
            @click="
              deleteUser(selectedUser);
              showConfirm = false;
            "
          >
            ลบ
          </v-btn>
          <v-btn class="btn-cancel" @click="showConfirm = false">
            ยกเลิก
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
import api from "@/services/api";
import router from "@/router";
import io from "socket.io-client";
export default {
  data() {
    return {
      userItems: [],
      selectedUser: {},
      page: 1,
      itemsPerPage: 10,
      showForm: false,
      showConfirm: false,
      socket: null,
      socketioURL: "http://localhost:3000",
    };
  },
  methods: {
    addAdmin() {
      this.$router.push(`/newadmintable`);
    },
    getId() {
      return this.$store.getters["authAdmin/getId"];
    },
    async deleteUser(user) {
      await api.delete("/users/" + user._id, {
        adminId: this.getId(),
      });
      this.showAlert();
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
            if (result.data[i]._id !== this.getId()) {
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
    if (this.isLogin) {
      this.fetchApi();
    } else {
      router.push("/login");
    }
  },
  created() {
    this.socket = io(this.socketioURL, {
      transports: ["websocket", "polling"],
    });
    this.socket.on("add-new", () => {
      this.fetchApi();
    });
    this.socket.on("update-user", () => {
      this.fetchApi();
    });
    this.socket.on("delete-user", () => {
      this.fetchApi();
    });
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
.btn-edit {
  color: #ffff;
  background-color: #00af70;
}
.text-color {
  color: #ffff;
}
.btn-confirm {
  color: #ffff;
  background-color: #b00020;
}
.btn-cancel {
  color: #ffff;
  background-color: #9e9e9e;
}
</style>
