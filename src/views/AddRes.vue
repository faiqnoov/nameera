<template>
  <h2>Add Reservation</h2>

  <p>idCust: {{ id }}</p>

  <form @submit.prevent="handleSubmit">
    <input type="text" id="treatment" placeholder="treatment" v-model="data.treatment">
    <input type="date" id="tgl" placeholder="tgl" v-model="data.tgl">
    <input type="number" id="biaya" placeholder="biaya" v-model="data.biaya">
    
    <button>Add</button>
  </form>

  <div>
    <ul>
      <li>{{data.treatment}}</li>
      <li>{{data.tgl}}</li>
      <li>{{data.biaya}}</li>
    </ul>
  </div>

  <form @submit.prevent="handleSubmit2">
    <input type="text" id="treatment2" placeholder="treatment2" v-model="treatment2">
    <input type="date" id="tgl2" placeholder="tgl2" v-model="tgl2">
    <input type="number" id="biaya2" placeholder="biaya2" v-model="biaya2">
    
    <button>Add</button>
  </form>

  <div>
    <ul>
      <li>{{treatment2}}</li>
      <li>{{tgl2}}</li>
      <li>{{biaya2}}</li>
    </ul>
  </div>
</template>

<script>
import { ref } from 'vue'
import { useRoute } from 'vue-router'

// firebase
import { db } from '../firebase/config'
import { collection, addDoc } from 'firebase/firestore'

export default {
  props: ['id'],
  setup() {
    const route = useRoute()

    const data = ref({
      treatment: null,
      tgl: null,
      biaya: null
    })

    const treatment2 = ref(null)
    const tgl2 = ref(null)
    const biaya2 = ref(null)

    const handleSubmit = async () => {
      console.log(data.value)

      const colRef = collection(db, 'reservations')

      await addDoc(colRef, {
        ...data.value,
        idCust: route.params.id
      })

      // reset form
      data.value = ''
    }

    const handleSubmit2 = async () => {
      console.log(treatment2.value, tgl2.value, biaya2.value)

      const colRef = collection(db, 'reservations')

      await addDoc(colRef, { 
        treatment: treatment2.value, 
        tgl: tgl2.value,
        biaya: biaya2.value,
        idCust: route.params.id
      })

      // reset form
      treatment2.value = ''
      tgl2.value = ''
      biaya2.value = ''
    }

    return { data, handleSubmit, treatment2, tgl2, biaya2, handleSubmit2 }
  }
}
</script>

<style>

</style>