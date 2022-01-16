import { ref, watchEffect } from 'vue'

// firebase
import { db } from '../firebase/config'
import { doc, onSnapshot } from 'firebase/firestore'

// fetching a single document (& realtime)
const getDoc = (col, docId) => {
  const document = ref(null)

  const docRef = doc(db, col, docId)
  
  const unsub = onSnapshot(docRef, (doc) => {
    document.value = doc.data()

    // let result = []
    // result.push({ ...doc.data(), id: doc.id })
    // document.value = result
  }) 

  console.log(document)

  watchEffect((onInvalidate) => {
    onInvalidate(() => unsub());
  })

  return { document }
}

export default getDoc