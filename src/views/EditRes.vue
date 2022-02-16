<template>
  <page-title>Edit Reservation</page-title>
  <div v-if="res">
    <div class="d-flex justify-content-center">
      <p>customer : {{ res.namaCust }}</p>
    </div>
    <div class="d-flex justify-content-center">
      <div class="card col-md-8">
        <div class="card-body">
          <form @submit.prevent="handleUpdate()">
            <div class="mb-3">
              <label for="tgl" class="form-label">Tanggal</label>
              <input type="date" class="form-control" id="tgl" v-model="res.tgl" required>
            </div>
            <div class="mb-3">
              <label for="jam" class="form-label">Jam</label>
              <input type="time" class="form-control" id="jam" v-model="res.jam" required>
            </div>
            <div class="mb-3">
              <label for="treatment" class="form-label">Treatment</label>
              <input type="text" class="form-control" id="treatment" v-model="res.treatment" required>
            </div>
            <div class="mb-3">
              <label for="lokasi" class="form-label">Lokasi</label>
              <select class="form-select" id="lokasi" v-model="res.lokasi" required>
                <option value="outlet">Outlet</option>
                <option value="homecare">Homecare</option>
              </select>
            </div>
            <div class="mb-3">
              <label for="growth" class="form-label">Usia / BB</label>
              <input type="text" class="form-control" id="growth" v-model="res.growth">
            </div>
            <div class="mb-3">
              <label for="kp" class="form-label">Kode Produk</label>
              <input type="text" class="form-control" id="kp" v-model="res.kodeProd">
            </div>
            <div class="mb-3">
              <label for="biaya" class="form-label">Biaya</label>
              <input type="number" class="form-control" id="biaya" v-model="res.biaya">
            </div>
            <div class="mb-3">
              <label for="biaya2" class="form-label">Biaya2</label>
              <input type="number" class="form-control" id="biaya2" v-model="res.biaya2">
            </div>
            <div class="mb-3">
              <label for="pay" class="form-label">Pembayaran</label>
              <select class="form-select" id="pay" v-model="res.payment">
                <option value="transfer">Transfer</option>
                <option value="cash">Cash</option>
                <option value="lainnya">Lainnya</option>
              </select>
            </div>
            <div class="mb-3">
              <label for="ket" class="form-label">Ket</label>
              <input type="text" class="form-control" id="ket" v-model="res.ket">
            </div>
            <div class="mb-3">
              <label for="nextTreat" class="form-label">Next Treat.</label>
              <input type="date" class="form-control" id="nextTreat" v-model="res.nextTreat">
            </div>
            <div class="d-flex justify-content-end">
              <button type="submit" class="btn btn-primary">Save Changes</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { useRoute, useRouter } from 'vue-router'
import getDoc from '../composables/getDoc'
import { db } from '../firebase/config'
import PageTitle from '../components/small/PageTitle.vue'

// firebase
import { doc, updateDoc } from '@firebase/firestore'

export default {
  components: {
    PageTitle
  },
  setup() {
    const route = useRoute()
    const router = useRouter()

    const { document: res } = getDoc('reservations', route.params.id)

    const handleUpdate = () => {
      const docRef = doc(db, 'reservations', route.params.id)
      const docRef2 = doc(db, 'finance', route.params.id)

      updateDoc(docRef, { 
        tgl: res.value.tgl,
        jam: res.value.jam,
        treatment: res.value.treatment,
        kodeProd: res.value.kodeProd,
        biaya: res.value.biaya,
        biaya2: res.value.biaya2,
        payment: res.value.payment,
        lokasi: res.value.lokasi,
        ket: res.value.ket,
        growth: res.value.growth,
        nextTreat: res.value.nextTreat,
        // status: res.value.status,
      })

      // update data keuangan ybs
      updateDoc(docRef2, {
        tgl: res.value.tgl,
        jml: res.value.biaya + res.value.biaya2
      })

      router.go(-1)
    }
    
    return { res, handleUpdate, route }
  }
}
</script>

<style>

</style>