<template>
  <div v-if="user" id="nav">
    <div>
      <p>logged in as {{ user.email }}</p>
    </div>
    <div>
      <router-link :to="{ name: 'Dashboard' }">Dashboard</router-link> |
      <router-link :to="{ name: 'Customers' }">Customers</router-link> | 
      <router-link :to="{ name: 'Reservations' }">Reservations</router-link> |
      <button @click="handleClick">Logout</button>
    </div>
  </div>
  <router-view/>
</template>

<script>
import getUser from '../composables/getUser'
import { useRouter } from 'vue-router'
import { watchEffect } from 'vue'

// firebase
import { auth } from '../firebase/config'
import { signOut } from 'firebase/auth'

export default {
  setup() {
    const { user } = getUser()
    const router = useRouter()

    const handleClick = () => {
      signOut(auth)
    }

    // redirect unauthenticated users
    watchEffect(() => {
      if (!user.value) {
        router.push({ name: 'Home' })
      }
    })
    
    return { handleClick, user }
  }
}
</script>