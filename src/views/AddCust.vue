<template>
  <form @submit.prevent="handleSubmit">
    <!-- <input type="text" id="jenis" placeholder="jenis" v-model="data.jenis"> -->
    <input type="text" id="nama" placeholder="nama" v-model="data.nama">
    <input type="text" id="namaOrtu" placeholder="namaOrtu" v-model="data.namaOrtu">
    <input type="text" id="alamat" placeholder="alamat" v-model="data.alamat">
    <input type="text" id="medsos" placeholder="medsos" v-model="data.medsos">
    <input type="date" id="tglLahir" placeholder="tglLahir" v-model="data.tglLahir">
    <input type="text" id="noTelp" placeholder="noTelp" v-model="data.noTelp">
    
    <button>Add</button>
  </form>

  <div>
    <ul>
      <li>{{data.nama}}</li>
      <li>{{data.namaOrtu}}</li>
      <li>{{data.alamat}}</li>
      <li>{{data.medsos}}</li>
      <li>{{data.tglLahir}}</li>
      <li>{{data.noTelp}}</li>
    </ul>
  </div>
</template>

<script>
import { ref } from 'vue'

// firebase
import { db } from '../firebase/config'
import { collection, addDoc } from 'firebase/firestore'
import { useRouter } from 'vue-router'

export default {
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
        createdAt: new Date(),
        lastMod: new Date()
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