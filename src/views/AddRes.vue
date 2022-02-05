<template>
  <page-title>Add Reservation</page-title>

  <div class="d-flex justify-content-center">
    <p>to : <span v-if="cust">{{ cust.nama }}</span></p>
  </div>
  <div class="d-flex justify-content-center">
    <div class="card col-md-8">
      <div class="card-body">
        <form @submit.prevent="handleSubmit">
          <div class="mb-3">
            <label for="tgl" class="form-label">Tanggal</label>
            <input type="date" class="form-control" id="tgl" v-model="data.tgl" required>
          </div>
          <div class="mb-3">
            <label for="jam" class="form-label">Jam</label>
            <input type="time" class="form-control" id="jam" v-model="data.jam" required>
          </div>
          <div class="mb-3">
            <label for="treatment" class="form-label">Treatment</label>
            <input type="text" class="form-control" id="treatment" v-model="data.treatment" required>
          </div>
          <div class="mb-3">
            <label for="lokasi" class="form-label">Lokasi</label>
            <select class="form-select" id="lokasi" v-model="data.lokasi" required>
              <option value="outlet">Outlet</option>
              <option value="homecare">Homecare</option>
            </select>
          </div>
          <div class="mb-3">
            <label for="growth" class="form-label">Usia / BB</label>
            <input type="text" class="form-control" id="growth" v-model="data.growth">
          </div>
          <div class="mb-3">
            <label for="kp" class="form-label">Kode Produk</label>
            <input type="text" class="form-control" id="kp" v-model="data.kodeProd">
          </div>
          <div class="mb-3">
            <label for="biaya" class="form-label">Biaya</label>
            <input type="number" class="form-control" id="biaya" v-model="data.biaya">
          </div>
          <div class="mb-3">
            <label for="biaya2" class="form-label">Biaya2</label>
            <input type="number" class="form-control" id="biaya2" v-model="data.biaya2">
          </div>
          <div class="mb-3">
            <label for="pay" class="form-label">Pembayaran</label>
            <select class="form-select" id="pay" v-model="data.payment">
              <option value="transfer">Transfer</option>
              <option value="cash">Cash</option>
              <option value="lainnya">Lainnya</option>
            </select>
          </div>
          <div class="mb-3">
            <label for="ket" class="form-label">Ket</label>
            <input type="text" class="form-control" id="ket" v-model="data.ket">
          </div>
          <div class="mb-3">
            <label for="nextTreat" class="form-label">Next Treat.</label>
            <input type="date" class="form-control" id="nextTreat" v-model="data.nextTreat">
          </div>
          <div class="d-flex justify-content-end">
            <button type="submit" class="btn btn-primary">Add</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import getDoc from '../composables/getDoc'
import PageTitle from '../components/small/PageTitle.vue'

// firebase
import { db } from '../firebase/config'
import { collection, addDoc } from 'firebase/firestore'

export default {
  components: {
    PageTitle
  },
  setup() {
    const route = useRoute()
    const router = useRouter()
    const { document: cust } = getDoc('customers', route.params.id)

    const data = ref({
      tgl: null,
      jam: null,
      treatment: null,
      kodeProd: null,
      biaya: null,
      biaya2: null,
      payment: null,
      // biayaTot: data.value.biaya + data.value.biaya2,
      lokasi: null,
      ket: null,
      growth: null,
      nextTreat: null,
      status: false,
    })

    // const jmlBiaya = computed(() => {
    //   return data.value.biaya + data.value.biaya2
    // })

    const handleSubmit = async () => {
      console.log(data.value)

      const colRef = collection(db, 'reservations')

      await addDoc(colRef, {
        ...data.value,
        idCust: route.params.id,
        namaCust: cust.value.nama,
        createdAt: new Date(),
        lastMod: new Date()
      })

      // reset form
      data.value = ''

      router.push({ name: 'CustDetails', props: { id: route.params.id }})
    }

    return { data, handleSubmit, cust }
  }
}
</script>

<style>

</style>