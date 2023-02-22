<template>
  <v-container fluid>
    <v-card>
      <v-row>
        <v-col cols="12" class="my-5">
          <v-form>
            <v-container>
              <v-row>
                <v-col>
                  <v-text-field
                    label="Name"
                    v-model="bookList.name"
                    :rules="nameRule"
                  />
                </v-col>
              </v-row>
              <v-row>
                <v-col>
                  <v-text-field
                    label="Author"
                    v-model="bookList.author"
                    :rules="authorRule"
                  />
                </v-col>
              </v-row>
              <v-row>
                <v-col>
                  <v-text-field
                    label="Publisher"
                    v-model="bookList.publisher"
                  />
                </v-col>
              </v-row>
              <v-row>
                <v-col>
                  <v-select
                    label="Category"
                    v-model="bookList.category"
                    :items ="categoryItem"
                  />
                </v-col>
              </v-row>
              <v-row>
                <v-col>
                  <v-text-field
                    label="Price"
                    v-model="bookList.price"
                    type="number"
                  />
                </v-col>
              </v-row>
              <v-row>
                <v-col>
                  <v-text-field
                    label="Image URL"
                    v-model="bookList.imageBook"
                  />
                </v-col>
              </v-row>
              <v-row>
                <v-col class="text-center">
                  <v-btn
                    color="success"
                    rounded
                    @click="showConfirmDialog = true"
                    >ยืนยัน</v-btn
                  >
                </v-col>
                <v-col class="text-center">
                  <v-btn color="Grey" rounded @click="submit">ยกเลิก</v-btn>
                </v-col>
              </v-row>
            </v-container>
          </v-form>
        </v-col>
      </v-row>
    </v-card>
  </v-container>

  <v-dialog
    v-model="showConfirmDialog"
    persistent
    style="z-index: 900"
    :center="true"
    max-width="500"
    :padding="20"
  >
    <v-card>
      <v-card-title class="headline text-center">ยืนยันการแก้ไข</v-card-title>
      <v-card-text class="text-center"
        >ต้องการยืนยันการแก้ไขหรือไม่</v-card-text
      >
      <v-card-actions class="text-center">
        <v-btn color="success" @click="submit()" class="mr-10"
          >ยืนยัน</v-btn
        >
        <v-btn color="Grey" text @click="showConfirmDialog = false"
          >ยกเลิก</v-btn
        >
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
      bookList: [],
      showConfirmDialog: false,
      nameRule: [(v) => !!v || "กรุณากรอกชื่อหนังสือ"],
      authorRule: [(v) => !!v || "กรุณากรอกชื่อผู้แต่ง"],
      publisherRule: [(v) => !!v || "กรุณากรอกชื่อสำนักพิมพ์"],
      categoryItem: ["การ์ตูนทั่วไป", "นิยาย"],
    };
  },
  methods: {
    async changeDuplicate() {},

    async fetchApi() {
      const res = await api.get("/books/" + this.$route.params.id);
      this.bookList = res.data;
      console.log(this.bookList);
    },
    submit() {
      api.put("/books/" + this.$route.params.id, this.bookList).then(() => {
        this.$router.push("/bookadmin");
      });
    }
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
