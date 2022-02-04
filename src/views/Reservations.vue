<template>
  <div class="card">
    <div class="card-header">
      <h5 class="mb-0">Data Reservasi</h5>
    </div>
    <div class="card-body">
      <div class="table-responsive">
        <table class="table table-bordered table-striped table-hover table-sm">
          <thead class="table-light">
            <tr>
              <th scope="col">Nama Customer</th>
              <th scope="col">Tanggal</th>
              <th scope="col">Jam</th>
              <th scope="col">Treatment</th>
              <th scope="col">Kode Prod.</th>
              <th scope="col">Biaya</th>
              <th scope="col">Biaya2</th>
              <th scope="col">Total</th>
              <th scope="col">Lokasi</th>
              <th scope="col">Ket</th>
              <th scope="col">Usia/BB</th>
              <th scope="col">Next</th>
              <th scope="col">status</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="res in reservations" :key="res.id">
              <td>
                <router-link :to="{ name: 'CustDetails', params: { id: res.idCust }}">
                  {{ res.namaCust }} <span class="material-icons-outlined md-14">open_in_new</span>
                </router-link>
              </td>
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
              <td>
                <router-link :to="{ name:'EditRes', params: { id: res.id } }">
                  <span class="material-icons-outlined text-primary">edit</span>
                </router-link>
                <span @click="deleteRes(res.id)" class="material-icons-outlined text-danger">delete_outline</span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>

</template>

<script>
import getCollection from '@/composables/getCollection'
import delDoc from '@/composables/delDoc'

export default {
  setup() {
    const { documents: reservations } = getCollection('reservations')

    const deleteRes = (id) => {
      delDoc('reservations', id)
    }

    return { reservations, deleteRes }
  }
}
</script>

<style>

</style>