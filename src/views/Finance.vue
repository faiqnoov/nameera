<template>
  <page-title>Finance</page-title>

  <div v-if="finance" class="card">
    <div class="card-body">
      <div class="table-responsive">
        <table class="table table-bordered table-striped table-hover table-sm">
          <thead class="table-light">
            <tr>
              <th>Jenis</th>
              <th>Ket / Id Reservasi</th>
              <th>Tanggal</th>
              <th>Nominal</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="fin in finance" :key="fin.id">
            <td>in</td>
            <td>{{ fin.ket }}</td>
            <td>{{ fin.tgl }}</td>
            <td>{{ fin.jml }}</td>
          </tr>
          </tbody>
          <thead>
            <tr>
              <th colspan="3">Total</th>
              <th @click="getTotal()">{{total}}</th>
            </tr>
          </thead>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from '@vue/reactivity'
import getCollection from '../composables/getCollection'
import PageTitle from '../components/small/PageTitle.vue'

export default {
  components: {
    PageTitle
  },
  setup() {
    const { documents: finance, results: items } = getCollection('finance')
    console.log(finance)

    let total = ref(0)

    // unsolved (harus klik dulu)
    const getTotal = () => {
      total.value = 0
      items.forEach((item) => {
        total.value += item.jml
      })
    }

    return { finance, getTotal, total }
  }
}
</script>