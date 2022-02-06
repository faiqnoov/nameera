<template>
  <h1>Keuangan</h1>

  <div v-if="finance">
    <table>
      <tr>
        <th>Jenis</th>
        <th>Ket / Id Reservasi</th>
        <th>Tanggal</th>
        <th>Nominal</th>
      </tr>
      <tr v-for="fin in finance" :key="fin.id">
        <td>in</td>
        <td>{{ fin.ket }}</td>
        <td>{{ fin.tgl }}</td>
        <td>{{ fin.jml }}</td>
      </tr>
      <tr>
        <th colspan="3">Total</th>
        <th @click="getTotal()">{{total}}</th>
      </tr>
    </table>
  </div>
</template>

<script>
import { ref } from '@vue/reactivity'
import getCollection from '../composables/getCollection'

export default {
  setup() {
    const { documents: finance, results: items } = getCollection('finance')
    console.log(finance)

    let total = ref(0)

    const getTotal = () => {
      total.value = 0
      items.forEach((item) => {
        total.value += item.jml
      })
      // console.log('total: ', total)
    }

    return { finance, getTotal, total }
  }
}
</script>

<style>

</style>