<template>
  <div id="nav">
    <router-link :to="{ name: 'Dashboard' }">Dashboard</router-link> |
    <router-link :to="{ name: 'Customers' }">Customers</router-link> | 
    <router-link :to="{ name: 'Reservations' }">Reservations</router-link> |
    <button @click="handleClick">Logout</button>
  </div>
  <router-view/>
</template>

<script>
import getUser from '../composables/getUser'

// firebase
import { auth } from '../firebase/config'
import { signOut } from 'firebase/auth'

export default {
  setup() {
    const { user } = getUser()

    const handleClick = () => {
      signOut(auth)
    }
    return { handleClick, user }
  }
}
</script>