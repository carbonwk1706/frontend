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
                    v-model="form.name"
                    :rules="nameRule"
                  />
                </v-col>
              </v-row>
              <v-row>
                <v-col>
                  <v-text-field
                    label="Author"
                    v-model="form.author"
                    :rules="authorRule"
                  />
                </v-col>
              </v-row>
              <v-row>
                <v-col>
                  <v-text-field
                    label="Publisher"
                    v-model="form.publisher"
                  />
                </v-col>
              </v-row>
              <v-row>
                <v-col>
                  <v-select
                    label="Category"
                    v-model="form.category"
                    :items ="categoryItem"
                  />
                </v-col>
              </v-row>
              <v-row>
                <v-col>
                  <v-text-field
                    label="Price"
                    v-model="form.price"
                    type="number"
                  />
                </v-col>
              </v-row>
              <v-row>
                <v-col>
                  <v-text-field
                    label="Image URL"
                    v-model="form.imageBook"
                  />
                </v-col>
              </v-row>
              <v-row>
                <!-- <v-col>
                  <v-text-field
                    label="Flie Book"
                    v-model="form.flieBook"
                  />
                </v-col> -->
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
                  <v-btn color="Grey" rounded @click="goBack()">ยกเลิก</v-btn>
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
import api from '@/services/api';

export default {
  components: {},
  data(){
    return {
      form:{
        name:"",
        author:"",
        publisher:"",
        category:"",
        price:"",
        imageBook:"",
        flieBook:""
        
      },
      
      showConfirmDialog: false,
      nameRule: [(v) => !!v || "กรุณากรอกชื่อหนังสือ"],
      authorRule: [(v) => !!v || "กรุณากรอกชื่อผู้แต่ง"],
      publisherRule: [(v) => !!v || "กรุณากรอกชื่อสำนักพิมพ์"],
      categoryItem: ["การ์ตูนทั่วไป", "นิยาย"],

    }
  },
  methods:{
    goBack(){
      this.$router.push("/booktable");
    },
    async submit() {
      try{
        const res = await api.post("/books",
        {
          name: this.form.name,
          author: this.form.author,
          publisher:this.form.publisher,
          category: this.form.category,
          price:this.form.price,
          imageBook:this.form.imageBook
         
        });
       
        if(res.status === 201){
          this.showAlertSucsess("เพิ่มหนังสือสำเร็จ")
          this.$router.push("/bookusersell");
        }
      }catch(error){
        console.log(error)
      }
    }, showAlertSucsess(text) {
      this.showConfirmDialog = false;
      this.$swal({
        confirmButtonColor: "#00af70",
        allowOutsideClick: false,
        width: "500",
        icon: "success",
        text: text,
        button: "OK",
      });
    },

  }


}
</script>
<style>
  .text-center {
  display: flex;
  justify-content: center;
}
</style>