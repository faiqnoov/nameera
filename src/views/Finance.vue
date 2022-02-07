<template>
  <page-title>Finance</page-title>

  <div v-if="finance" class="card">
    <div class="card-header d-flex justify-content-between align-items-center">
      <h6 class="mb-0">Data Keuangan</h6>
      <router-link :to="{ name: 'AddFin' }">
        <button type="button" class="btn btn-primary btn-sm d-flex align-items-center">
          <span class="material-icons-outlined md-18">add</span>
        </button>
      </router-link>
    </div>
    <div class="card-body">
      <div class="table-responsive">
        <table class="table table-bordered table-striped table-hover table-sm">
          <thead class="table-light">
            <tr>
              <th>Jenis</th>
              <th>Ket / Id Reservasi</th>
              <th>Tanggal</th>
              <th>Nominal</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="fin in finance" :key="fin.id">
            <td>{{ fin.jenis }}</td>
            <td>{{ fin.ket }}</td>
            <td>{{ fin.tgl }}</td>
            <td>{{ fin.jml }}</td>
            <td>
              <span @click="deleteFin(fin.id)" class="material-icons-outlined text-danger">delete_outline</span>
              <router-link :to="{ name:'EditFin', params: { id: fin.id } }" v-if="fin.src=='manual'">
                <span class="material-icons-outlined text-primary">edit</span>
              </router-link>
            </td>
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
import delDoc from '@/composables/delDoc'

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

    const deleteFin = (id) => {
      delDoc('finance', id)
    }

    return { finance, getTotal, total, deleteFin }
  }
}
</script>