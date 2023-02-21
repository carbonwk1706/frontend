<template>
    <v-table>
      <thead>
        <tr>
          <th class="text-left">ลำดับ</th>
          <th class="text-left">วันที่</th>
          <th class="text-left">คำร้อง</th>
          <th class="text-left">สถานะ</th>
          <th class="text-left"></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(index, item) in requestStatus" :key="index">
          <td>{{ item + 1 }}</td>
          <td>{{ formatTime(requestStatus[item].createdAt) }}</td>
          <td>{{ requestStatus[item].request }}</td>
          <td>{{ requestStatus[item].status }}</td>
          <td>
            <v-btn
              variant="flat"
              color="grey"
              class="mr-3"
              @click="showDetail(requestStatus[item]._id)"
            >
              รายละเอียด
            </v-btn>
            <v-btn
              variant="flat"
              color="success"
              class="mr-3"
              @click="showConfirmDialog = true"

            >
              อนุมัติ
            </v-btn>
            <v-btn variant="flat" color="error" @click="showCancelDialog = true"> ยกเลิก </v-btn>
          </td>

          <v-dialog
    v-model="showConfirmDialog"
    persistent
    style="z-index: 900"
    :center="true"
    max-width="500"
    :padding="20"
  >
    <v-card>
      <v-card-title class="headline text-center ">รายการอนุมัติ</v-card-title>
      <v-card-text class="text-center"
        >ต้องการยืนยันการอนุมัติหรือไม่</v-card-text
      >
      <v-card-actions class="text-center">
        <v-btn color="success" @click="approveRequest(requestStatus[item]._id)" class="mr-10">ยืนยัน</v-btn>
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
      <v-card-title class="headline text-center ">ยกเลิก</v-card-title>
      <v-card-text class="text-center"
        >ต้องการยืนยันการยกเลิกหรือไม่</v-card-text
      >
      <v-card-actions class="text-center">
        <v-btn color="success" @click="rejectsRequest(requestStatus[item]._id)" class="mr-10">ยืนยัน</v-btn>
        <v-btn color="Grey" text @click="showCancelDialog = false"
          >ยกเลิก</v-btn
        >
      </v-card-actions>
    </v-card>
  </v-dialog>


        </tr>
      </tbody>
    </v-table>

   



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
      showDetail(id) {
        this.$router.push(`/request/${id}`);
      },
      formatTime(item){
        return moment(item).format('MM/DD/YYYY, h:mm:ss a');
      },
      async approveRequest(id) {
        try {
          await api.patch(`/request/${id}/approve`);
          this.showAlert()
        } catch (error) {
          console.log(error);
        }
          this.fetchApi()
      },
      async rejectsRequest(id) {
        try {
          await api.patch(`/request/${id}/reject`);
        } catch (error) {
          console.log(error);
        }
          this.fetchApi()
      },
      async fetchApi() {
        try {
          const res = await api.get("/request");
          this.requestStatus = res.data.requests;
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
      })
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


</style>
