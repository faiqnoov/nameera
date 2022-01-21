// import getCollection from '../composables/getCollection'

// firebase
import { db } from '../firebase/config'
import { doc, deleteDoc } from 'firebase/firestore'

const delDoc = (col, docId, nama) => {
  const docRef = doc(db, col, docId)

  if(col == 'customers') {
    if(confirm('Sebelum menghapus data customer, pastikan semua data reservasi yang bersangkutan sudah dihapus!')) {
      let n = prompt('Tulis nama "' + nama + '" untuk konfirmasi!')
      if(n == nama) {
        deleteDoc(docRef)
  
        // hapus data reservasi dari user ybs
        
        // const { documents: resData } = getCollection( 
        //   'reservations',
        //   ['idCust', '==', docId]
        // )
        // console.log(resData)
  
        // console.log(resData._rawValue)
        // console.log(typeof(resData))
        // for(let res in resData) {
        //   console.log(res)
        // }
        return true
      } else {
        alert('Data customer gagal dihapus.')
      }
    } 

  } else {
    if(confirm('Yakin hapus data reservasi?') == true) {
      deleteDoc(docRef)
    }
  }
}

export default delDoc