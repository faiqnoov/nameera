<template>
  <h1>Customers Page</h1>

  <router-link :to="{ name: 'AddCust' }">Tambah Customer</router-link>

  <table>
    <tr>
      <th>Id</th>
      <th>Nama</th>
      <th>Nama Ortu</th>
      <!-- <th>Alamat</th> -->
      <th>Medsos</th>
      <th>Tgl. Lahir</th>
      <th>No. Telp.</th>
      <th>Action</th>
    </tr>
    <tr v-for="cust in customers" :key="cust.id">
      <td>{{ cust.id }}</td>
      <td>{{ cust.nama }}</td>
      <td>{{ cust.namaOrtu }}</td>
      <!-- <td>{{ cust.alamat }}</td> -->
      <td>{{ cust.medsos }}</td>
      <td>{{ cust.tglLahir }}</td>
      <td>{{ cust.noTelp }}</td>
      <td><router-link :to="{ name: 'CustDetails', params: { id: cust.id }}">Details</router-link></td> 
    </tr>
  </table>
</template>

<script>
import getCollection from '@/composables/getCollection'

export default {
  setup() {
    const { documents: customers } = getCollection('customers')

    console.log(customers)

    return { customers }
  }
}
</script>

<style>
table {
  border-collapse: collapse;
  width: 100%;
}
td, th {
  border: 1px solid #dddddd;
  text-align: left;
  padding: 4px;
}
</style>