<template>
  <h1>Keuangan</h1>

  <div>
    <table>
      <tr>
        <th>Tanggal</th>
        <th>Ket / Id Reservasi</th>
        <th>Jenis</th>
        <th>Nominal</th>
      </tr>
      <tr v-for="res in reservations" :key="res.id">
        <td>{{ res.tgl }}</td>
        <td>{{ res.id }}</td>
        <td>masuk</td>
        <td>{{ res.biaya + res.biaya2 }}</td>
      </tr>
      <tr>
        <th>Total</th>
        <th></th>
        <th></th>
        <th>{{ totMasuk }}</th>
      </tr>
    </table>
  </div>
</template>

<script>
import getCollection from '../composables/getCollection'

export default {
  setup() {
    const { results: res, documents: reservations } = getCollection('reservations')
    console.log(res)

    let totMasuk = 1
    res.forEach((r) => {
      totMasuk += (r.value.biaya + r.value.biaya2)
      console.log(r.value.biaya + r.value.biaya2)
      console.log(totMasuk)
      console.log('oke')
    })

    return { reservations, totMasuk }
  }
}
</script>

<style>

</style>