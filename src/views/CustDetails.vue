<template>
  <page-title>Customer Details</page-title>

  <div v-if="cust">
    <div class="col-md-7">
      <table class="table table-sm table-borderless">
        <tbody>
          <tr>
            <th scope="row" style="width: 20%;">Nama</th>
            <td  style="width: 80%;">: {{ cust.nama }}</td>
          </tr>
          <tr>
            <th scope="row">Nama Ortu</th>
            <td>: {{ cust.namaOrtu }}</td>
          </tr>
          <tr>
            <th scope="row">Alamat</th>
            <td>: {{ cust.alamat }}</td>
          </tr>
          <tr>
            <th scope="row">Medsos</th>
            <td>: {{ cust.medsos }}</td>
          </tr>
          <tr>
            <th scope="row">Tanggal lahir</th>
            <td>: {{ cust.tglLahir }}</td>
          </tr>
          <tr>
            <th scope="row">No. Telepon</th>
            <td>: {{ cust.noTelp }}</td>
          </tr>
        </tbody>
      </table>
    </div>

    <div class="card">
      <div class="card-header d-flex justify-content-between align-items-center">
        <h6 class="mb-0">Riwayat reservasi</h6>
        <router-link :to="{ name: 'AddRes', params: { id: id } }">
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
                <th>Tanggal</th>
                <th>Jam</th>
                <th>Treatment</th>
                <th>KP</th>
                <th>Biaya</th>
                <th>Biaya2</th>
                <th>Lokasi</th>
                <th>Ket</th>
                <th>Usia/BB</th>
                <th>Next Treat.</th>
                <th>status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="res in reservations" :key="res.id">
                <td>{{ res.tgl }}</td>
                <td>{{ res.jam }}</td>
                <td>{{ res.treatment }}</td>
                <td>{{ res.kodeProd }}</td>
                <td>{{ res.biaya }}</td>
                <td>{{ res.biaya2 }}</td>
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

    <div class="d-flex justify-content-center mt-4">
      <router-link :to="{ name:'EditCust', params: { id: id } }">
        <button type="button" class="btn btn-primary btn-sm">Edit Customer</button>
      </router-link>
      <button type="button" class="btn btn-danger btn-sm ms-4" @click="deleteCust(id, cust.nama)">Hapus Customer</button>
    </div>
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
import PageTitle from '../components/small/PageTitle.vue'

// firebase
import { db } from '../firebase/config'
import { doc, deleteDoc } from 'firebase/firestore'

export default {
  props: ['id'],
  components: {
    PageTitle
  },
  setup() {
    const route = useRoute()
    const router = useRouter()

    const { document: cust } = getDoc('customers', route.params.id)

    const { documents: reservations } = getCollection(
      'reservations',
      ['idCust', '==', route.params.id]
    )

    const deleteRes = (id) => {
      if(delDoc('reservations', id)) {
        // delete data keuangan ybs
        deleteDoc(doc(db, 'finance', id))
      }
    }

    const deleteCust = (id, nama) => {
      if(delDoc('customers', id, nama)) {
        router.push({ name: 'Customers' })
      }
    }

    return { cust, reservations, deleteRes, deleteCust }
  }
}
</script>

<style>

</style>