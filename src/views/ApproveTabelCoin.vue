<template>
  <v-table dense class="elevation-1">
    <thead class="table">
      <tr>
        <th class="text-left">ลำดับ</th>
        <th class="text-left">วันที่</th>
        <th class="text-left">คำร้อง</th>
        <th class="text-left">จำนวนเงิน</th>
        <th class="text-left">ธนาคาร</th>
        <th class="text-left">สถานะ</th>
        <th class="text-left"></th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(item, index) in requestStatus" :key="index">
        <td>{{ index+1 }}</td>
        <td>{{ formatTime(item.createdAt) }}</td>
        <td>{{ item.request }}</td>
        <td>{{ item.amount }} บาท</td>
        <td>{{ item.method }}</td>
        <td>{{ item.status }}</td>
        <td>
          <v-btn
            variant="flat"
            color="grey"
            class="mr-3"
            @click="showDetail(item._id)"
          >
            รายละเอียด
          </v-btn>

          <v-btn
            variant="flat"
            color="success"
            class="mr-3"
            @click="approve(item._id)"
          >
            อนุมัติ
          </v-btn>

          <v-btn variant="flat" color="error" @click="rejects(item._id)">
            ยกเลิก
          </v-btn>
        </td>
      </tr>
    </tbody>
  </v-table>

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
        <v-btn color="success" text @click=" approveRequest(confirmDialogId) " class="mr-10"
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
        <v-btn color="success" text @click=" rejectsRequest(cancelDialogId) " class="mr-10"
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
      requestStatus: [],
    };
  },
  methods: {
    approve(id) {
      this.showConfirmDialog = true;
      this.confirmDialogId = id;
    },
    rejects(id) {
      this.showCancelDialog = true;
      this.cancelDialogId = id;
    },
    showDetail(id) {
      this.$router.push(`/requestcoin/${id}`);
    },
    getId() {
      return this.$store.getters["authAdmin/getId"];
    },
    formatTime(item) {
      return moment(item).format("MM/DD/YYYY, h:mm:ss a");
    },
    async approveRequest(id) {
      try {
          await api.patch(`/requestcoin/${id}/approve`,{
            adminId: this.getId()
          });
          this.showAlert()
        } catch (error) {
          console.log(error);
        }
        this.showConfirmDialog = false ;
        this.fetchApi();
    },
    async rejectsRequest(id) {
      try {
        await api.patch(`/requestcoin/${id}/reject`, {
          adminId: this.getId()
        });
        this.showAlertCancel()
      } catch (error) {
        console.log(error);
      }
      this.showCancelDialog = false ;
      this.fetchApi();
    },
    async fetchApi() {
      try {
        const res = await api.get("/requestcoin");
        this.requestStatus = res.data.receipt;
        console.log(this.requestStatus)
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
  mounted() {
    this.fetchApi();
  },
};
</script>
<style>
.text-center {
  display: flex;
  justify-content: center;
}
.table {
  background-color: rgb(54, 233, 108);
}
</style>
