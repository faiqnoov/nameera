<template>
  <h1>Customer Details</h1>

  <div v-if="cust">
    <div>
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
        <th>action</th>
      </tr>
      <tr v-for="res in reservations" :key="res.id">
        <td>{{ res.idCust }}</td>
        <td>{{ res.namaCust }}</td>
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
        <td><button @click="deleteRes(res.id)">X</button></td>
      </tr>
    </table>
  
    <br><br>
    <button @click="deleteCust(route.params.id, cust.nama)">Hapus Customer</button>  
  </div>
  <div v-else>
    <h3>Data customer tidak ditemukan :(</h3>
  </div>

</template>

<script>
import { useRoute, useRouter } from 'vue-router'
import getDoc from '../composables/getDoc'
import getCollection from '../composables/getCollection'
import delDoc from '../composables/delDoc'

export default {
  props: ['id'],
  setup() {
    const route = useRoute()
    const router = useRouter()

    const { document: cust } = getDoc('customers', route.params.id)

    const { documents: reservations } = getCollection(
      'reservations',
      ['idCust', '==', route.params.id]
    )

    const deleteRes = (id) => {
      delDoc('reservations', id)
    }

    const deleteCust = (id, nama) => {
      delDoc('customers', id, nama)
      
      router.push({ name: 'Customers' })
    }

    return { cust, reservations, deleteRes, deleteCust, route }
  }
}
</script>

<style>

</style>vue