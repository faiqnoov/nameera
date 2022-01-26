<template>
  <h2>Edit data reservasi {{route.params.id}}</h2>

  <div v-if="res">
    <form @submit.prevent="handleUpdate()">
      <p><input type="date" id="tgl" placeholder="tgl" v-model="res.tgl"></p>
      <p><input type="time" id="jam" placeholder="jam" v-model="res.jam"></p>
      <p><input type="text" id="treatment" placeholder="treatment" v-model="res.treatment"></p>
      <p><input type="text" id="kodeProd" placeholder="kodeProd" v-model="res.kodeProd"></p>
      <p><input type="number" id="biaya" placeholder="biaya" v-model="res.biaya"></p>
      <p><input type="number" id="biaya2" placeholder="biaya2" v-model="res.biaya2"></p>
      <p><input type="text" id="lokasi" placeholder="lokasi" v-model="res.lokasi"></p>
      <p><input type="text" id="ket" placeholder="ket" v-model="res.ket"></p>
      <p><input type="text" id="growth" placeholder="growth" v-model="res.growth"></p>
      <p><input type="date" id="nextTreat" placeholder="nextTreat" v-model="res.nextTreat"></p>
      
      <button>Save Changes</button>
    </form>

    <div>
      <ul>
        <li>{{res.tgl}}</li>
        <li>{{res.jam}}</li>
        <li>{{res.treatment}}</li>
        <li>{{res.kodeProd}}</li>
        <li>{{res.biaya}}</li>
        <li>{{res.biaya2}}</li>
        <li>{{res.lokasi}}</li>
        <li>{{res.ket}}</li>
        <li>{{res.growth}}</li>
        <li>{{res.nextTreat}}</li>
        <li>{{res.status}}</li>
      </ul>
    </div>
  </div>
</template>

<script>
import { useRoute, useRouter } from 'vue-router'
import getDoc from '../composables/getDoc'
import { db } from '../firebase/config'

// firebase
import { doc, updateDoc } from '@firebase/firestore'

export default {
  setup() {
    const route = useRoute()
    const router = useRouter()

    const { document: res } = getDoc('reservations', route.params.id)

    const handleUpdate = () => {
      const docRef = doc(db, 'reservations', route.params.id)

      updateDoc(docRef, { 
        tgl: res.value.tgl,
        jam: res.value.jam,
        treatment: res.value.treatment,
        kodeProd: res.value.kodeProd,
        biaya: res.value.biaya,
        biaya2: res.value.biaya2,
        lokasi: res.value.lokasi,
        ket: res.value.ket,
        growth: res.value.growth,
        nextTreat: res.value.nextTreat,
        // status: res.value.status,
        lastMod: new Date()
      })

      router.go(-1)
    }
    
    return { res, handleUpdate, route }
  }
}
</script>

<style>

</style>