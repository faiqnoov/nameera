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

  let results = []

  const unsub = onSnapshot(colRef, (snapshot) => {
    snapshot.docs.forEach(doc => {
      // console.log('snapshot: ', typeof(doc), doc.data().treatment)
      results.push({ ...doc.data(), id: doc.id })
    })
    // console.log('results: ', results)

    documents.value = results
  })

  watchEffect((onInvalidate) => {
    onInvalidate(() => unsub());
  })

  return { documents, results }
}

export default getCollection