<template>
    <v-table density="compact">
      <thead class="table">
        <tr>
          <th class="text-left">Name</th>
          <th class="text-left">Author</th>
          <th class="text-left">Publisher</th>
          <th class="text-left">Category</th>
          <th class="text-left">Price</th>
          <th class="text-left">ImageBook</th>
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
  
          <!-- <td class="d-flex justify-center mt-2">
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
          </td> -->
        </tr>
      </tbody>
    </v-table>
  
    <!-- <v-dialog
      v-model="showConfirm"
      persistent
      style="z-index: 900"
      :center="true"
      max-width="500"
      :padding="20"
    >
      <v-card>
        <v-card-title class="headline text-center">ยืนยันการลบ</v-card-title>
        <v-card-text class="text-center">
          คุณต้องการลบผู้ใช้ {{ selectedUser.name }} ใช่หรือไม่?
        </v-card-text>
        <v-card-actions class="text-center">
          <v-btn color="Grey" text @click="showConfirm = false"> ยกเลิก </v-btn>
          <v-btn
            color="red darken-1"
            text
            @click="
              deleteUser(selectedUser);
              showConfirm = false;
            "
          >
            ลบ
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog> -->
  </template>
  
  <script>
import api from '@/services/api';

  
  export default {
        data(){
            return {
                bookList: []

            }
        },
        methods: {
            async fetchApi(){
                try{
                    const result = await api.get("/books");
                    this.bookList = result.data.books;
                    console.log(this.bookList)
                }catch(error){
                    console.log(error);
                } 
            }
        },

        mounted(){
            this.fetchApi();
        }
    
  
    
    };

 
  </script>