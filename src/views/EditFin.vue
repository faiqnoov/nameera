<template>
  <page-title>Edit Financial Records</page-title>

  <div v-if="fin" class="d-flex justify-content-center">
    <div class="card col-md-8">
      <div class="card-body">
        <form @submit.prevent="handleUpdate()">
          <div class="mb-3">
            <label for="jenis" class="form-label">Jenis</label>
            <select class="form-select" id="jenis" v-model="fin.jenis" required>
              <option value="in">In</option>
              <option value="out">Out</option>
            </select>
          </div>
          <div class="mb-3">
            <label for="ket" class="form-label">Keterangan</label>
            <input type="text" class="form-control" id="ket" v-model="fin.ket">
          </div>
          <div class="mb-3">
            <label for="mejmldsos" class="form-label">Nominal</label>
            <input type="number" class="form-control" id="jml" v-model="fin.jml">
          </div>
          <div class="mb-3">
            <label for="tgl" class="form-label">Tanggal</label>
            <input type="date" class="form-control" id="tgl" v-model="fin.tgl">
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

    const { document: fin } = getDoc('finance', route.params.id)

    const handleUpdate = () => {
      const docRef = doc(db, 'finance', route.params.id)

      updateDoc(docRef, { 
        jenis: fin.value.jenis,
        ket: fin.value.ket,
        jml: fin.value.jml,
        tgl: fin.value.tgl
      })

      router.go(-1)
    }
    
    return { fin, handleUpdate }
  }
}
</script>