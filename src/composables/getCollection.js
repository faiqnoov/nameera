import { ref, watchEffect } from 'vue'

// firebase
import { db } from '../firebase/config'
import { collection, onSnapshot, query, where, orderBy } from 'firebase/firestore'

const getCollection = (col, que) => {
  const documents = ref(null)

  let colRef = collection(db, col)
  
  // conditional query
  let q = null
  if(col == 'reservations') {
    q = query(colRef, orderBy("tgl", "desc"), orderBy("jam", "desc"))
    if(que) {
      q = query(colRef, where(...que), orderBy("tgl", "desc"), orderBy("jam", "desc"))
    }
  } else if(col == 'customers') {
    q = query(colRef, orderBy("createdAt"))
  } else if(col == 'finance') {
    q = query(colRef, orderBy("tgl"))
  }

  let results = []

  const unsub = onSnapshot(q, (snapshot) => {
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