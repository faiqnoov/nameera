import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Customers from '../views/Customers.vue'
import Reservations from '../views/Reservations.vue'
import CustDetails from '../views/CustDetails.vue'
import AddRes from '../views/AddRes.vue'
import AddCust from '../views/AddCust.vue'
import EditCust from '../views/EditCust.vue'
import EditRes from '../views/EditRes.vue'
import Dashboard from '../views/Dashboard.vue'

// firebase
import { auth } from '../firebase/config'

// route guards
const requireAuth = (to, from, next) => {
  let user = auth.currentUser
  if (!user) {
    next({ name: 'Home' })
  } else {
    next()
  }
}

const requireNoAuth = (to, from, next) => {
  let user = auth.currentUser
  if (user) {
    next({ name: 'Dashboard' })
  } else {
    next()
  }
}



const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    beforeEnter: requireNoAuth
  },
  {
    path: '/admin/dashboard',
    name: 'Dashboard',
    component: Dashboard,
    beforeEnter: requireAuth
  },
  {
    path: '/admin/cust',
    name: 'Customers',
    component: Customers,
    beforeEnter: requireAuth
  },
  {
    path: '/admin/cust/add',
    name: 'AddCust',
    component: AddCust,
    beforeEnter: requireAuth
  },
  {
    path: '/admin/cust/:id',
    name: 'CustDetails',
    component: CustDetails,
    props: true,  // mengizinkan route params dipakai sebagai prop pada component
    beforeEnter: requireAuth
  },
  {
    path: '/admin/cust/:id/edit',
    name: 'EditCust',
    component: EditCust,
    beforeEnter: requireAuth
  },
  {
    path: '/admin/cust/:id/add-res',
    name: 'AddRes',
    component: AddRes,
    props: true,
    beforeEnter: requireAuth
  },
  {
    path: '/admin/res/:id/edit',
    name: 'EditRes',
    component: EditRes,
    beforeEnter: requireAuth
  },
  {
    path: '/admin/res',
    name: 'Reservations',
    component: Reservations,
    beforeEnter: requireAuth
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router