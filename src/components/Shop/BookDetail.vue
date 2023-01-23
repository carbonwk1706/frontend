<template>
  <v-container>
    <div class="herdName">Name Book</div>
    <v-row>
      <v-col class="d-flex justify-end">
        <v-img
          src="https://cdn-local.mebmarket.com/meb/server1/225738/Thumbnail/book_detail_large.gif?2"
          max-height="500"
          max-width="500"
        />
      </v-col>
      <v-col>
        <v-col>
          <v-row>โดย auther</v-row>
          <v-row>สำนักพิมพ์ publissher</v-row>
          <v-row>หมวดหมู่ category</v-row>
          <v-row>
            <v-btn color="success" rounded> ฿ 1000 </v-btn>
          </v-row>
          <v-row>
            <v-btn icon color="pink" @click="disabled">
              <v-icon>mdi-heart</v-icon>
            </v-btn>
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

<style scoped>
.herdName {
  display: flex;
  justify-content: center;
  margin-bottom: 30px;
  font-size: larger;
  font-weight: bold;
}
</style>
