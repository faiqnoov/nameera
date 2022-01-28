import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Customers from '../views/Customers.vue'
import Reservations from '../views/Reservations.vue'
import CustDetails from '../views/CustDetails.vue'
import AddRes from '../views/AddRes.vue'
import AddCust from '../views/AddCust.vue'
import EditCust from '../views/EditCust.vue'
import EditRes from '../views/EditRes.vue'
import Finance from '../views/Finance.vue'

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
    path: '/admin/cust/add',
    name: 'AddCust',
    component: AddCust
  },
  {
    path: '/admin/cust/:id',
    name: 'CustDetails',
    component: CustDetails,
    props: true  // mengizinkan route params dipakai sebagai prop pada component
  },
  {
    path: '/admin/cust/:id/edit',
    name: 'EditCust',
    component: EditCust
  },
  {
    path: '/admin/cust/:id/add-res',
    name: 'AddRes',
    component: AddRes,
    props: true
  },
  {
    path: '/admin/res/:id/edit',
    name: 'EditRes',
    component: EditRes
  },
  {
    path: '/admin/res',
    name: 'Reservations',
    component: Reservations
  },
  {
    path: '/admin/fin',
    name: 'Finance',
    component: Finance
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router