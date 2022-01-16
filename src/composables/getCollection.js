import { ref, watchEffect } from 'vue'

// firebase
import { db } from '../firebase/config'
import { collection, onSnapshot, query, where } from 'firebase/firestore'

const getCollection = (col, que) => {
  const documents = ref(null)

  let colRef = collection(db, col)

  // filter collections
  if(que) {
    colRef = query(colRef, where(...que))
  }

  const unsub = onSnapshot(colRef, (snapshot) => {
    let results = []
    snapshot.docs.forEach(doc => {
      results.push({ ...doc.data(), id: doc.id })
    })

    documents.value = results
  })

  watchEffect((onInvalidate) => {
    onInvalidate(() => unsub());
  })

  return { documents }
}

export default getCollection