import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Customers from '../views/Customers.vue'
import Reservations from '../views/Reservations.vue'
import CustDetails from '../views/CustDetails.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/admin/cust',
    name: 'Customers',
    component: Customers
  },
  {
    path: '/admin/cust/:id',
    name: 'CustDetails',
    component: CustDetails,
    props: true
  },
  {
    path: '/admin/res',
    name: 'Reservations',
    component: Reservations
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
