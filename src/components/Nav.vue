<template>
  <div v-if="user" id="nav">
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
      <div class="container">
        <router-link :to="{ name: 'Dashboard' }" class="navbar-brand">
          <img src="../assets/img/weblogo.svg" alt="logo" height="24" class="align-top">
        </router-link>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse justify-content-between" id="navbarNavAltMarkup">
          <ul class="navbar-nav">
            <li class="nav-item">
              <router-link :to="{ name: 'Dashboard' }" class="nav-link">Dashboard</router-link>
            </li>
            <li class="nav-item">
              <router-link :to="{ name: 'Customers' }" class="nav-link">Customers</router-link>
            </li>
            <li class="nav-item">
              <router-link :to="{ name: 'Reservations' }" class="nav-link">Reservations</router-link>
            </li>
            <li class="nav-item">
              <router-link :to="{ name: 'Finance' }" class="nav-link">Finance</router-link>
            </li>
          </ul>
          <ul class="navbar-nav">
            <li class="nav-item dropdown">
              <a class="nav-link dropdown-toggle d-flex align-items-center" href="#" id="navbarDropdownMenuLink" role="button" data-bs-toggle="dropdown" aria-expanded="false"><span class="material-icons-outlined me-1">person</span>{{ user.email }}
              </a>
              <ul class="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                <li><a class="dropdown-item" href="#" @click="handleClick">Sign Out</a></li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  </div>
  <div class="container pt-4 pb-5">
    <router-view/>
  </div>
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

<style scoped>
.router-link-active {
  font-weight: bold;
}
</style>