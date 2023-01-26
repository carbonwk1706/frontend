<template>
  <v-btn class="ma-2 pa-2" color="primary" @click="addDessert"
    >เพิ่มสมาชิก</v-btn
  >
  <v-table density="compact">
    <thead>
      <tr>
        <th class="text-left">Name</th>
        <th class="text-left">Calories</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="item in desserts" :key="item.name">
        <td>{{ item.name }}</td>
        <td>{{ item.calories }}</td>
        <td>
          <v-btn color="primary" @click="editDessert(item)">แก้ไข</v-btn>
          <v-btn color="error" @click="deleteDessert(item)">ลบ</v-btn>
        </td>
      </tr>
    </tbody>
  </v-table>
</template>
<script>

export default {
  data() {
    return {
      desserts: [
        {
          name: "KitKat",
          calories: 518,
        },
      ],
      newDessert: {
        name: '',
        calories: 0
      }
    };
  },
  methods: {
    addDessert() {
      this.desserts.push(this.newDessert);
      this.newDessert = {
        name: '',
        calories: 0
      }
    },
    editDessert(dessert) {
      let index = this.desserts.indexOf(dessert);
      this.desserts.splice(index, 1, this.newDessert);
      this.newDessert = {
        name: '',
        calories: 0
      }
    },
    deleteDessert(dessert) {
      let index = this.desserts.indexOf(dessert);
      this.desserts.splice(index, 1);
    },
  },
};
</script>
<style >
.left {
  display: flex;
  justify-content: left;
  align-items: center;
}
</style>