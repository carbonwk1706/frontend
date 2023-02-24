<template>
  <v-row>
    <v-col cols="12">
      <h2>รายการคำร้อง</h2>
    </v-col>
  </v-row>
  <v-row class="mb-1">
    <v-col cols="6" class="text-start">
      <div class="select-width">
        <v-select
          density="compact"
          v-model="select"
          :items="selectItem"
          variant="outlined"
        ></v-select>
      </div>
    </v-col>
    <v-col v-if="request.length > 0" cols="6" class="pa-0 d-flex justify-end">
      <v-pagination
        class="text-pagination"
        v-model="page"
        :length="pages"
        circle
      ></v-pagination>
    </v-col>
  </v-row>
  <v-table v-if="request.length > 0" dense class="elevation-1">
    <thead class="table">
      <tr>
        <th class="text-left">ลำดับ</th>
        <th class="text-left">วันที่</th>
        <th class="text-left">คำร้อง</th>
        <th class="text-left">สถานะ</th>
        <th class="text-left"></th>
      </tr>
    </thead>
    <tbody>
      <tr
        v-for="(item, index) in request.slice(
          (page - 1) * itemsPerPage,
          page * itemsPerPage
        )"
        :key="index"
      >
        <td>{{ index + 1 }}</td>
        <td>{{ formatTime(item.createdAt) }}</td>
        <td>{{ item.request }}</td>
        <td>{{ item.status }}</td>
        <td>
          <v-btn
            variant="flat"
            color="grey"
            class="mr-3"
            @click="showDetail(item)"
          >
            รายละเอียด
          </v-btn>

          <v-btn
            variant="flat"
            color="success"
            class="mr-3"
            @click="approve(item)"
          >
            อนุมัติ
          </v-btn>

          <v-btn variant="flat" color="error" @click="rejects(item)">
            ยกเลิก
          </v-btn>
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
  <v-row v-if="request.length > 0" class="mt-12">
    <v-col cols="12" class="pa-0 d-flex justify-center">
      <v-pagination
        class="text-pagination"
        v-model="page"
        :length="pages"
        circle
      ></v-pagination>
    </v-col>
  </v-row>

  <v-dialog
    v-model="showConfirmDialog"
    persistent
    style="z-index: 900"
    :center="true"
    max-width="500"
    :padding="20"
  >
    <v-card>
      <v-card-title class="headline text-center">รายการอนุมัติ</v-card-title>
      <v-card-text class="text-center"
        >ต้องการยืนยันการอนุมัติหรือไม่</v-card-text
      >
      <v-card-actions class="text-center">
        <v-btn
          color="success"
          text
          @click="approveRequest(confirmDialogId)"
          class="mr-10"
          >ยืนยัน</v-btn
        >
        <v-btn color="Grey" text @click="showConfirmDialog = false"
          >ยกเลิก</v-btn
        >
      </v-card-actions>
    </v-card>
  </v-dialog>

  <v-dialog
    v-model="showCancelDialog"
    persistent
    style="z-index: 900"
    :center="true"
    max-width="500"
    :padding="20"
  >
    <v-card>
      <v-card-title class="headline text-center">รายการยกเลิก</v-card-title>
      <v-card-text class="text-center"
        >ต้องการยืนยันการยกเลิกหรือไม่</v-card-text
      >
      <v-card-actions class="text-center">
        <v-btn
          color="success"
          text
          @click="rejectsRequest(cancelDialogId)"
          class="mr-10"
          >ยืนยัน</v-btn
        >
        <v-btn color="Grey" text @click="showCancelDialog = false"
          >ยกเลิก</v-btn
        >
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script>
import api from "@/services/api";
import moment from "moment";

export default {
  data() {
    return {
      showConfirmDialog: false,
      showCancelDialog: false,
      request: [],
      select: "คำร้องทั้งหมด",
      selectItem: ["คำร้องทั้งหมด", "คำร้องขอขายอีบุ๊ค", "คำร้องขอเติม Coin"],
      page: 1,
      itemsPerPage: 10,
    };
  },
  methods: {
    approve(item) {
      this.showConfirmDialog = true;
      this.confirmDialogId = item;
    },
    rejects(item) {
      this.showCancelDialog = true;
      this.cancelDialogId = item;
    },
    showDetail(item) {
      if (item.request === "คำร้องขอสมัครขายอีบุ๊ค") {
        this.$router.push(`/request/${item._id}`);
      } else if (item.request === "คำร้องขอเพิ่ม Coin") {
        this.$router.push(`/requestcoin/${item._id}`);
      }
    },
    getId() {
      return this.$store.getters["authAdmin/getId"];
    },
    formatTime(item) {
      return moment(item).format("MM/DD/YYYY, h:mm:ss a");
    },
    async approveRequest(item) {
      if (item.request === "คำร้องขอสมัครขายอีบุ๊ค") {
        try {
          await api.patch(`/request/${item._id}/approve`, {
            adminId: this.getId(),
          });
          this.showAlert();
        } catch (error) {
          console.log(error);
        }
        this.showConfirmDialog = false;
        this.fetchApi();
      } else if (item.request === "คำร้องขอเพิ่ม Coin") {
        try {
          await api.patch(`/requestcoin/${item._id}/approve`, {
            adminId: this.getId(),
          });
          this.showAlert();
        } catch (error) {
          console.log(error);
        }
        this.showConfirmDialog = false;
        this.fetchApi();
      }
    },
    async rejectsRequest(item) {
      if (item.request === "คำร้องขอสมัครขายอีบุ๊ค") {
        try {
          await api.patch(`/request/${item._id}/reject`, {
            adminId: this.getId(),
          });
          this.showAlert();
        } catch (error) {
          console.log(error);
        }
        this.showCancelDialog = false;
        this.fetchApi();
      } else if (item.request === "คำร้องขอเพิ่ม Coin") {
        try {
          await api.patch(`/requestcoin/${item._id}/reject`, {
            adminId: this.getId(),
          });
          this.showAlert();
        } catch (error) {
          console.log(error);
        }
        this.showCancelDialog = false;
        this.fetchApi();
      }
    },
    async fetchApi() {
      try {
        const res = await api.get("/allrequest");
        this.request = res.data.combinedData;
      } catch (error) {
        console.log(error);
      }
    },
    async getRequest() {
      try {
        const res = await api.get("/request");
        this.request = res.data.requests;
      } catch (error) {
        console.log(error);
      }
    },
    async getReceipts() {
      try {
        const res = await api.get("/requestcoin");
        this.request = res.data.receipt;
      } catch (error) {
        console.log(error);
      }
    },
    showAlert() {
      this.$swal({
        scrollbarPadding: false,
        confirmButtonColor: "#00af70",
        customClass: "show-modal",
        text: "อนุมัติสำเร็จ",
        icon: "success",
        allowOutsideClick: false,
        confirmButtonText: "OK",
      });
    },
    showAlertCancel() {
      this.$swal({
        scrollbarPadding: false,
        confirmButtonColor: "#00af70",
        customClass: "show-modal",
        text: "ยกเลิกสำเร็จ",
        icon: "success",
        allowOutsideClick: false,
        confirmButtonText: "OK",
      });
    },
  },
  computed: {
    pages() {
      return Math.ceil(this.request.length / this.itemsPerPage);
    },
  },
  watch: {
    select(newValue) {
      if (newValue) {
        if (newValue === "คำร้องทั้งหมด") {
          this.fetchApi();
        } else if (newValue === "คำร้องขอขายอีบุ๊ค") {
          this.getRequest();
        } else if (newValue === "คำร้องขอเติม Coin") {
          this.getReceipts();
        }
      }
    },
  },
  mounted() {
    this.fetchApi();
  },
};
</script>
<style scoped>
.text-center {
  display: flex;
  justify-content: center;
}
.table {
  background-color: rgb(54, 233, 108);
}
.select-width {
  width: 200px;
}
</style>
