<template>
  <div>
    <h3>Login Form</h3>

    <form @submit.prevent="handleSubmit">
      <p><input type="email" placeholder="Email" v-model="email" required></p>
      <p><input type="password" placeholder="Password" v-model="password" required></p>

      <button>Login</button>
      <div v-if="error">{{ error }}</div>
    </form>
  </div>
</template>

<script>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import useLogin from '../composables/useLogin'

export default {
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