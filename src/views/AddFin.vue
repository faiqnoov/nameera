<template>
  <page-title>Add Financial Records</page-title>

  <div class="d-flex justify-content-center">
    <div class="card col-md-8">
      <div class="card-body">
        <form @submit.prevent="handleSubmit">
          <div class="mb-3">
            <label for="jenis" class="form-label">Jenis</label>
            <select class="form-select" id="jenis" v-model="data.jenis" required>
              <option value="in">In</option>
              <option value="out">Out</option>
            </select>
          </div>
          <div class="mb-3">
            <label for="ket" class="form-label">Keterangan</label>
            <input type="text" class="form-control" id="ket" v-model="data.ket">
          </div>
          <div class="mb-3">
            <label for="mejmldsos" class="form-label">Nominal</label>
            <input type="number" class="form-control" id="jml" v-model="data.jml">
          </div>
          <div class="mb-3">
            <label for="tgl" class="form-label">Tanggal</label>
            <input type="date" class="form-control" id="tgl" v-model="data.tgl">
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
      jenis: null,
      ket: null,
      jml: null,
      tgl: null
    })

    const handleSubmit = async () => {
      console.log(data.value)

      const colRef = collection(db, 'finance')

      await addDoc(colRef, {
        ...data.value,
        src: 'manual'
      })

      // reset form
      data.value = ''

      router.push({ name: 'Finance' })
    }

    return { data, handleSubmit }
  }
}
</script>