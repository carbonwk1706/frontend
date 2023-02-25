<template>
  <div class="d-flex justify-center">รายละเอียดคำร้อง</div>
  <v-container>
    <v-row>
      <v-col cols="6" sm="6">
        <v-card class="card">
          <v-card-text>
            <v-row class="d-flex justify-center">
              <v-col cols="6" class="d-flex justify-start">
                <span>ID:</span>
              </v-col>
              <v-col cols="6" class="d-flex justify-end">
                <span>{{ request._id}}</span>
              </v-col>
              <v-divider></v-divider>
              <v-col cols="6" class="d-flex justify-start">
                <span>เรื่อง:</span>
              </v-col>
              <v-col cols="6" class="d-flex justify-end">
                <span> {{ request.request }} </span>
              </v-col>
              <v-divider></v-divider>
              <v-col cols="6" class="d-flex justify-start">
                <span>สถานะคำร้อง:</span>
              </v-col>
              <v-col cols="6" class="d-flex justify-end">
                <span> {{ request.status }} </span>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="6" sm="6">
        <v-card class="card">
          <v-card-text>
            <v-row class="d-flex justify-center">
              <v-col cols="6" class="d-flex justify-start">
                <span>ที่อยู่:</span>
              </v-col>
              <v-col cols="6" class="d-flex justify-end">
                <span> {{ request.address }} </span>
              </v-col>
              <v-divider></v-divider>
              <v-col cols="6" class="d-flex justify-start">
                <span>บัญชีธนาคาร:</span>
              </v-col>
              <v-col cols="6" class="d-flex justify-end">
                <span> {{ request.bankAccount }} </span>
              </v-col>
              <v-divider></v-divider>
              <v-col cols="6" class="d-flex justify-start">
                <span>เขต:</span>
              </v-col>
              <v-col cols="6" class="d-flex justify-end">
                <span> {{ request.district }} </span>
              </v-col>
              <v-divider></v-divider>
              <v-col cols="6" class="d-flex justify-start">
                <span>ไอดี:</span>
              </v-col>
              <v-col cols="6" class="d-flex justify-end">
                <span> {{ request.idAccount }} </span>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="6" sm="6">
        <v-card class="card">
          <v-card-text>
            <v-row class="d-flex justify-center">
              <v-col cols="6" class="d-flex justify-start">
                <span>รหัสประจำตัวประชาชน:</span>
              </v-col>
              <v-col cols="6" class="d-flex justify-end">
                <span> {{ request.idCard }} </span>
              </v-col>
              <v-col cols="6" class="d-flex justify-start">
                <span> รูปภาพบัตรประชาชน:</span>
              </v-col>
              <v-col cols="6" class="d-flex justify-end">
                <v-img
                  :width="348"
                  aspect-ratio="16/9"
                  cover
                  src="https://cdn.vuetifyjs.com/images/parallax/material.jpg"
                  onclick="previewImage(this)"
                ></v-img>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="6" sm="6">
        <v-card class="card">
          <v-card-text>
            <v-row class="d-flex justify-center">
              <v-col cols="6" class="d-flex justify-start">
                <span>ชื่อ:</span>
              </v-col>
              <v-col cols="6" class="d-flex justify-end">
                <span> {{ request.firstName }} </span>
              </v-col>
              <v-divider></v-divider>
              <v-col cols="6" class="d-flex justify-start">
                <span>นามสกุล:</span>
              </v-col>
              <v-col cols="6" class="d-flex justify-end">
                <span> {{ request.lastName }} </span>
              </v-col>
              <v-divider></v-divider>
              <v-col cols="6" class="d-flex justify-start">
                <span>เบอร์โทรศัพท์:</span>
              </v-col>
              <v-col cols="6" class="d-flex justify-end">
                <span> {{ request.phone }} </span>
              </v-col>
              <v-divider></v-divider>
              <v-col cols="6" class="d-flex justify-start">
                <span>รหัสไปรษณีย์:</span>
              </v-col>
              <v-col cols="6" class="d-flex justify-end">
                <span> {{ request.postCode }} </span>
              </v-col>
              <v-divider></v-divider>
              <v-col cols="6" class="d-flex justify-start">
                <span>จังหวัด:</span>
              </v-col>
              <v-col cols="6" class="d-flex justify-end">
                <span> {{ request.province }} </span>
              </v-col>
              <v-divider></v-divider>
              <v-col cols="6" class="d-flex justify-start">
                <span>สำนักพิมพ์:</span>
              </v-col>
              <v-col cols="6" class="d-flex justify-end">
                <span> {{ request.publisher }} </span>
              </v-col>
              <v-divider></v-divider>
              <v-col cols="6" class="d-flex justify-start">
                <span>ถนน:</span>
              </v-col>
              <v-col cols="6" class="d-flex justify-end">
                <span> {{ request.road }} </span>
              </v-col>
              <v-divider></v-divider>
              <v-col cols="6" class="d-flex justify-start">
                <span>ตำบล:</span>
              </v-col>
              <v-col cols="6" class="d-flex justify-end">
                <span> {{ request.subDistrict }} </span>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
import api from "@/services/api";
export default {
  data() {
    return {
      request: [],
    };
  },
  methods : {

   previewImage(image) {
  // Create a new image element
  var preview = document.createElement("img");
  preview.src = image.src;
  preview.classList.add("preview-image");

  // Append the image to the body or a specific container element
  document.body.appendChild(preview);

  // Add a click event listener to remove the preview when clicked
  preview.addEventListener("click", function() {
    document.body.removeChild(preview);
  });
}
  },
  mounted() {
    api.get("/request/" + this.$route.params.id).then((result) => {
      this.request = result.data.request;
      console.log(this.request);
    });
  },

};
</script>
<style scoped>
.card {
  background-color: #f6f6f6;
}

.preview-image {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.8);
  object-fit: contain;
  cursor: pointer;
}
</style>
