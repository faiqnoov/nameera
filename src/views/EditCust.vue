<template>
  <page-title>Edit Customer</page-title>
  
  <div v-if="cust">
    <div class="d-flex justify-content-center">
      <div class="card col-md-8">
        <div class="card-body">
          <form @submit.prevent="handleUpdate()">
            <div class="mb-3">
              <label for="nama" class="form-label">Nama</label>
              <input type="text" class="form-control" id="nama" v-model="cust.nama" required>
            </div>
            <div class="mb-3">
              <label for="nOrtu" class="form-label">Nama Ortu*</label>
              <input type="text" class="form-control" id="nOrtu" aria-describedby="nOrtuHelp" v-model="cust.namaOrtu">
              <div id="nOrtuHelp" class="form-text">*Kosongkan jika customer termasuk kategori dewasa.</div>
            </div>
            <div class="mb-3">
              <label for="alamat" class="form-label">Alamat</label>
              <input type="text" class="form-control" id="alamat" v-model="cust.alamat">
            </div>
            <div class="mb-3">
              <label for="medsos" class="form-label">Medsos</label>
              <input type="text" class="form-control" id="medsos" v-model="cust.medsos">
            </div>
            <div class="mb-3">
              <label for="tgl" class="form-label">Tgl. Lahir</label>
              <input type="date" class="form-control" id="tgl" v-model="cust.tglLahir">
            </div>
            <div class="mb-3">
              <label for="no" class="form-label">No. Telepon</label>
              <input type="text" class="form-control" id="no" v-model="cust.noTelp">
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
import getCollection from '../composables/getCollection'
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

    const { document: cust } = getDoc('customers', route.params.id)
    const { results: reservations } = getCollection(
      'reservations',
      ['idCust', '==', route.params.id]
    )

    const handleUpdate = () => {
      const docRef = doc(db, 'customers', route.params.id)

      updateDoc(docRef, { 
        nama: cust.value.nama,
        namaOrtu: cust.value.namaOrtu,
        alamat: cust.value.alamat,
        medsos: cust.value.medsos,
        tglLahir: cust.value.tglLahir,
        noTelp: cust.value.noTelp
      })

      // update field nama data reservasi ybs
      reservations.forEach((r) => {
        const docRef2 = doc(db, 'reservations', r.id)

        updateDoc(docRef2, {
          namaCust: cust.value.nama
        })
      });

      router.go(-1)
    }
    
    return { cust, handleUpdate }
  }
}
</script>

<style>

</style>