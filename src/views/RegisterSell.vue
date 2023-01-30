<template>
  <div class="text-center mt-6 text-header font-text">
    <span>สมัครขายหนังสือ</span>
  </div>

  <v-card class="mt-5 mx-auto pa-4 bg-card"
  max-width="566">
    <v-card-text>
      หลังจากที่ลงทะเบียนเป็นนักเขียน/สำนักพิมพ์แล้ว
      ต้องรอการอนุมัติจากเจ้าหน้าที่ก่อน
      เมื่อเจ้าหน้าที่ได้ทำการอนุมัติบัญชีผู้ใช้ของท่านแล้ว
      ท่านสามารถเพิ่มและอัปโหลดหนังสือเข้ามาในระบบได้ทันที
      ทั้งนี้หลังจากได้รับการอนุมัติให้เผยแพร่ผลงานแล้ว
    </v-card-text>
  </v-card>

  <v-card
    class="mt-5 mx-auto pa-4 bg-card"
    max-width="566"
    title="ข้อมูลสำนักพิมพ์ / นักเขียน"
  >
    <hr />
    <v-container>
      <v-row>
        <v-col cols="5">
          <span>บุคคล / นิติบุคคล</span>
        </v-col>

        <v-col cols="7">
          <v-text-field variant="solo"></v-text-field>
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="5">
          <span>นามปากกา / สำนักพิมพ์ <span style="color: red">*</span></span>
        </v-col>

        <v-col cols="7">
          <v-text-field
            label="กรอกนามปากกา / สำนักพิมพ์"
            variant="solo"
          ></v-text-field>
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="5">
          <span>ชื่อ-นามสกุล <span style="color: red">*</span></span>
        </v-col>

        <v-col cols="7">
          <v-text-field label="กรอกชื่อ" variant="solo"></v-text-field>
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="5">
          <span>นามสกุล <span style="color: red">*</span></span>
        </v-col>

        <v-col cols="7">
          <v-text-field label="กรอกนามสกุล" variant="solo"></v-text-field>
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="5">
          <span>รหัสประจำตัวประชาชน <span style="color: red">*</span></span>
        </v-col>

        <v-col cols="7">
          <v-text-field
            label="กรอกรหัสบัตรประจำตัวประชาชน"
            variant="solo"
          ></v-text-field>
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="5">
          <span>เบอร์โทรศัพท์ <span style="color: red">*</span></span>
        </v-col>

        <v-col cols="7">
          <v-text-field label="กรอกเบอร์โทรศัพท์" variant="solo"></v-text-field>
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="5">
          <span>รูปบัตรประชาชน <span style="color: red">*</span></span>
        </v-col>

        <v-col cols="7">
          <v-text-field label="Label Text"></v-text-field>
        </v-col>
      </v-row>
    </v-container>

    <v-divider></v-divider>

    <v-card-actions>
      <v-spacer></v-spacer>

      <v-btn color="success">
        Complete Registration

        <v-icon icon="mdi-chevron-right" end></v-icon>
      </v-btn>
    </v-card-actions>
  </v-card>
</template>
<script>
export default {};
</script>
<style scoped>
.text-header {
  font-size: 2rem;
}
.font-text {
  font-family: Prompt, sans-serif;
}

.bg-card {
  background-color: #f6f6f6;
}
</style>
