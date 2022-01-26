<template>
  <h2>Edit data customer</h2>

  <div v-if="cust">
    <form @submit.prevent="handleUpdate()">
      <p><input type="text" id="nama"  placeholder="nama" v-model="cust.nama"></p>
      <p><input type="text" id="namaOrtu" placeholder="namaOrtu" v-model="cust.namaOrtu"></p>
      <p><input type="text" id="alamat" placeholder="alamat" v-model="cust.alamat"></p>
      <p><input type="text" id="medsos" placeholder="medsos" v-model="cust.medsos"></p>
      <p><input type="date" id="tglLahir" placeholder="tglLahir" v-model="cust.tglLahir"></p>
      <p><input type="text" id="noTelp" placeholder="noTelp" v-model="cust.noTelp"></p>
      
      <button>Save Changes</button>
    </form>

    <div>
      <ul>
        <li>{{cust.nama}}</li>
        <li>{{cust.namaOrtu}}</li>
        <li>{{cust.alamat}}</li>
        <li>{{cust.medsos}}</li>
        <li>{{cust.tglLahir}}</li>
        <li>{{cust.noTelp}}</li>
      </ul>
    </div>
  </div>
</template>

<script>
import { useRoute, useRouter } from 'vue-router'
import getDoc from '../composables/getDoc'
import getCollection from '../composables/getCollection'
import { db } from '../firebase/config'

// firebase
import { doc, updateDoc } from '@firebase/firestore'

export default {
  setup() {
    const route = useRoute()
    const router = useRouter()

    const { document: cust } = getDoc('customers', route.params.id)
    const { documents: reservations, results: results } = getCollection(
      'reservations',
      ['idCust', '==', route.params.id]
    )
    // console.log(typeof(reservations))
    // console.log(reservations)
    // for(let res in reservations) {
    //   console.log(res._value)
    // }

    const handleUpdate = () => {
      const docRef = doc(db, 'customers', route.params.id)

      updateDoc(docRef, { 
        nama: cust.value.nama,
        namaOrtu: cust.value.namaOrtu,
        alamat: cust.value.alamat,
        medsos: cust.value.medsos,
        tglLahir: cust.value.tglLahir,
        noTelp: cust.value.noTelp,
        lastMod: new Date()
      })

      // update field nama data reservasi ybs
      results.forEach((r) => {
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