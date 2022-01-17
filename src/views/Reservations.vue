<template>
  <h1>Reservation page</h1>

  <table>
    <tr>
      <!-- <th>Id</th> -->
      <th>IdCust</th>
      <th>Nama</th>
      <th>Tanggal</th>
      <th>Jam</th>
      <th>Treatment</th>
      <th>KP</th>
      <th>Biaya</th>
      <th>Biaya2</th>
      <th>Total</th>
      <th>Lokasi</th>
      <th>Ket</th>
      <th>Usia/BB</th>
      <th>Next</th>
      <th>status</th>
    </tr>
    <tr v-for="res in reservations" :key="res.id">
      <!-- <td>{{ res.id }}</td> -->
      <td>{{ res.idCust }}</td>
      <td>{{ res.namaCust }}</td>
      <td>{{ res.tgl }}</td>
      <td>{{ res.jam }}</td>
      <td>{{ res.treatment }}</td>
      <td>{{ res.kodeProd }}</td>
      <td>{{ res.biaya }}</td>
      <td>{{ res.biaya2 }}</td>
      <td>{{ res.biaya + res.biaya2 }}</td>
      <td>{{ res.lokasi }}</td>
      <td>{{ res.ket }}</td>
      <td>{{ res.growth }}</td>
      <td>{{ res.nextTreat }}</td>
      <td>{{ res.status }}</td>
    </tr>
  </table> 
</template>

<script>
import getCollection from '@/composables/getCollection'

export default {
  setup() {
    const { documents: reservations } = getCollection('reservations')

    console.log(reservations)

    return { reservations }
  }
}
</script>

<style>

</style>