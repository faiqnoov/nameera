<template>
  <page-title>Tambah Customer</page-title>

  <div class="d-flex justify-content-center">
    <div class="card col-md-8">
      <div class="card-body">
        <form @submit.prevent="handleSubmit">
          <div class="mb-3">
            <label for="nama" class="form-label">Nama</label>
            <input type="text" class="form-control" id="nama" v-model="data.nama" required>
          </div>
          <div class="mb-3">
            <label for="nOrtu" class="form-label">Nama Ortu*</label>
            <input type="text" class="form-control" id="nOrtu" aria-describedby="nOrtuHelp" v-model="data.namaOrtu">
            <div id="nOrtuHelp" class="form-text">*Kosongkan jika customer termasuk kategori dewasa.</div>
          </div>
          <div class="mb-3">
            <label for="alamat" class="form-label">Alamat</label>
            <input type="text" class="form-control" id="alamat" v-model="data.alamat">
          </div>
          <div class="mb-3">
            <label for="medsos" class="form-label">Medsos</label>
            <input type="text" class="form-control" id="medsos" v-model="data.medsos">
          </div>
          <div class="mb-3">
            <label for="tgl" class="form-label">Tgl. Lahir</label>
            <input type="date" class="form-control" id="tgl" v-model="data.tglLahir">
          </div>
          <div class="mb-3">
            <label for="no" class="form-label">No. Telepon</label>
            <input type="text" class="form-control" id="no" v-model="data.noTelp">
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
import PageTitle from '../components/small/PageTitle.vue'

// firebase
import { db } from '../firebase/config'
import { collection, addDoc } from 'firebase/firestore'
import { useRouter } from 'vue-router'

export default {
  components: {
    PageTitle
  },
  setup() {
    const router = useRouter()
    const data = ref({
      nama: null,
      namaOrtu: null,
      alamat: null,
      medsos: null,
      tglLahir: null,
      noTelp: null
    })

    const handleSubmit = async () => {
      console.log(data.value)

      const colRef = collection(db, 'customers')

      await addDoc(colRef, {
        ...data.value,
        createdAt: new Date()
      })

      // reset form
      data.value = ''

      router.push({ name: 'Customers' })
    }

    return { data, handleSubmit }
  }
}
</script>

<style>

</style>