<template>
  <div class="d-flex justify-content-center my-5">
    <img src="../assets/img/weblogo-black.svg" height="50">
  </div>
  <page-title>Welcome!</page-title>

  <div class="d-flex justify-content-center align-items-center mt-3">
    <div class="card col col-sm-8 col-md-6 col-lg-4">
      <div class="card-body">
        <form @submit.prevent="handleSubmit">
          <div class="mb-3">
            <label for="email" class="form-label">Email</label>
            <input type="email" class="form-control" id="email" v-model="email" required>
          </div>
          <div class="mb-3">
            <label for="password" class="form-label">Password</label>
            <input type="password" class="form-control" id="password" v-model="password" required>
          </div>
          <div class="d-flex justify-content-center">
            <button type="submit" class="btn btn-primary">Log in</button>
          </div>
        </form>
        <div v-if="error" class="text-danger mt-3">{{ error }}</div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import useLogin from '../composables/useLogin'
import PageTitle from './small/PageTitle.vue'

export default {
  components: {
    PageTitle
  },
  setup() {
    const { login, error } = useLogin()
    const router = useRouter()

    const email = ref('')
    const password = ref('')

    const handleSubmit = async () => {
      await login(email.value, password.value)
      if(!error.value) {
        router.push({ name: 'Dashboard' })
      }
    }

    return { email, password, handleSubmit, error }
  }
}
</script>

<style>

</style>