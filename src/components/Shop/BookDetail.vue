<template>
  <v-container>
    <div class="herdName">Name Book</div>
    <v-row>
      <v-col class="d-flex justify-end">
        <img src="https://cdn-local.mebmarket.com/meb/server1/225738/Thumbnail/book_detail_large.gif?2" alt="">
      </v-col>
      <v-col>
        <v-col>
          <v-row>โดย auther</v-row>
          <v-row>สำนักพิมพ์ publissher</v-row>
          <v-row>หมวดหมู่ category</v-row>
          <v-row>
            <v-btn> ฿ 1000 </v-btn>
          </v-row>
        </v-col>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "BookTable",
};
</script>

<style>
.herdName{
  display: flex;
  justify-content: center;
  padding: 5px;
  font-size: larger;
  font-weight: bold;
}
</style>
