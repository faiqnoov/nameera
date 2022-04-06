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
              <th>Keterangan / Id Reservasi</th>
              <th>Tanggal</th>
              <th>Masuk</th>
              <th>Keluar</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="fin in finance" :key="fin.id">
            <td>{{ fin.ket }}</td>
            <td>{{ fin.tgl }}</td>
            <td class="text-end">
              <span v-if="fin.jenis=='in'">{{ new Intl.NumberFormat('de-DE').format(fin.jml) }}</span>
              <span v-else></span>
            </td>
            <td class="text-end">
              <span v-if="fin.jenis=='in'"></span>
              <span v-else>{{ new Intl.NumberFormat('de-DE').format(fin.jml) }}</span>
            </td>
            <td>
              <span v-if="fin.src=='manual'">
                <router-link :to="{ name:'EditFin', params: { id: fin.id } }">
                  <span class="material-icons-outlined text-primary">edit</span>
                </router-link>
                <span @click="deleteFin(fin.id)" class="material-icons-outlined text-danger">delete_outline</span>
              </span>
            </td>
          </tr>
          </tbody>
          <thead>
            <tr>
              <th></th>
              <th>Total :</th>
              <th colspan="2" class="text-end" @click="getTotal()">{{ new Intl.NumberFormat('de-DE').format(total) }}</th>
              <th></th>
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