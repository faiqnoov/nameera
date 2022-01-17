<template>
  <h2>Add Reservation</h2>

  <p>idCust: {{ id }}</p>

  <form @submit.prevent="handleSubmit">
    <input type="date" id="tgl" placeholder="tgl" v-model="data.tgl">
    <input type="time" id="jam" placeholder="jam" v-model="data.jam">
    <input type="text" id="treatment" placeholder="treatment" v-model="data.treatment">
    <input type="text" id="kodeProd" placeholder="kodeProd" v-model="data.kodeProd">
    <input type="number" id="biaya" placeholder="biaya" v-model="data.biaya">
    <input type="number" id="biaya2" placeholder="biaya2" v-model="data.biaya2">
    <input type="text" id="lokasi" placeholder="lokasi" v-model="data.lokasi">
    <input type="text" id="ket" placeholder="ket" v-model="data.ket">
    <input type="text" id="growth" placeholder="growth" v-model="data.growth">
    <input type="date" id="nextTreat" placeholder="nextTreat" v-model="data.nextTreat">
    
    <button>Add</button>
  </form>

  <div>
    <ul>
      <li>{{data.tgl}}</li>
      <li>{{data.jam}}</li>
      <li>{{data.treatment}}</li>
      <li>{{data.kodeProd}}</li>
      <li>{{data.biaya}}</li>
      <li>{{data.biaya2}}</li>
      <li>{{data.lokasi}}</li>
      <li>{{data.ket}}</li>
      <li>{{data.growth}}</li>
      <li>{{data.nextTreat}}</li>
      <li>{{data.status}}</li>
    </ul>
  </div>
</template>

<script>
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import getDoc from '../composables/getDoc'

// firebase
import { db } from '../firebase/config'
import { collection, addDoc } from 'firebase/firestore'

export default {
  props: ['id'],
  setup() {
    const route = useRoute()
    const router = useRouter()
    const { document: cust } = getDoc('customers', route.params.id)
    // console.log(cust)

    const data = ref({
      tgl: null,
      jam: null,
      treatment: null,
      kodeProd: null,
      biaya: null,
      biaya2: null,
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

    return { data, handleSubmit }
  }
}
</script>

<style>

</style>