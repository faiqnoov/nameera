<template>
  <h1>Customer Details</h1>

  <div v-if="cust">
    <p>Nama: {{ cust.nama }}</p>
    <p>Alamat: {{ cust.alamat }}</p>
  </div>
  <h2>Detal reservasi </h2>

  <router-link :to="{ name: 'AddRes' }">Tambah Reservasi</router-link>

  <table>
    <tr>
      <th>IdCust</th>
      <th>Nama</th>
      <th>Tanggal</th>
      <th>Jam</th>
      <th>Treatment</th>
      <th>KP</th>
      <th>Biaya</th>
      <th>Biaya2</th>
      <th>Lokasi</th>
      <th>Ket</th>
      <th>Usia/BB</th>
      <th>status</th>
    </tr>
    <tr v-for="res in reservations" :key="res.id">
      <td>{{ res.idCust }}</td>
      <td>?</td>
      <td>{{ res.tgl }}</td>
      <td>{{ res.jam }}</td>
      <td>{{ res.treatment }}</td>
      <td>{{ res.kodeProd }}</td>
      <td>{{ res.biaya }}</td>
      <td>{{ res.biaya2 }}</td>
      <td>{{ res.lokasi }}</td>
      <td>{{ res.ket }}</td>
      <td>{{ res.growth }}</td>
      <td>{{ res.status }}</td>
    </tr>
  </table>  
</template>

<script>
import { useRoute } from 'vue-router'
import getDoc from '../composables/getDoc'
import getCollection from '../composables/getCollection'

export default {
  props: ['id'],
  setup() {
    const route = useRoute()

    const { document: cust } = getDoc('customers', route.params.id)
    // console.log(cust)

    const { documents: reservations } = getCollection(
      'reservations',
      ['idCust', '==', route.params.id]
    )
    console.log(reservations)

    return { cust, reservations }
  }
}
</script>

<style>

</style>vue