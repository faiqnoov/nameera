<template>
  <div id="nav">
    <router-link :to="{ name: 'Dashboard' }">Dashboard</router-link> |
    <router-link :to="{ name: 'Customers' }">Customers</router-link> | 
    <router-link :to="{ name: 'Reservations' }">Reservations</router-link>
  </div>
  <router-view/>
</template>

<script>
export default {

}
</script>