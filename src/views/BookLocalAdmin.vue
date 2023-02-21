<template>
  <v-row>
    <v-col cols="12">
      <v-table dense class="elevation-1">
        <thead class="table">
          <tr>
            <th class="text-left">Name</th>
            <th class="text-left">Author</th>
            <th class="text-left">Publisher</th>
            <th class="text-left">Category</th>
            <th class="text-left">Price</th>
            <th class="text-left">Image</th>

            <th class="text-left"></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in bookList" :key="index">
            <td class="mt-2">{{ item.name }}</td>
            <td class="mt-2">{{ item.author }}</td>
            <td class="mt-2">{{ item.publisher }}</td>
            <td class="mt-2">{{ item.category }}</td>
            <td class="mt-2">{{ item.price }}</td>
            <td class="mt-2">{{ item.imageBook }}</td>
            <td class="d-flex justify-center mt-2">
              <v-btn
                variant="flat"
                color="success"
                class="mr-3"
                @click="editBook(item)"
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
    </v-col>
  </v-row>
</template>

<script>
import api from '@/services/api';
export default {
  components: {},
  data() {
    return {
      bookList: [],
    };
  },
  methods: {
    async fetchApi(){
        try{
            const result = await api.get("/books");
            this.bookList = result.data;
            console.log(result.data)
        }catch(error){
            console.log(error);
        }
    }
  },
  mounted() {
    this.fetchApi();
  },
};
</script>
<style>
.table {
  background-color: rgb(54, 233, 108);
}


</style>

