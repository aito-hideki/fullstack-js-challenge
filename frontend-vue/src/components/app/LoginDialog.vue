<template>
  <v-dialog
    v-model="loginDialog"
    max-width="350px"
  >
    <v-card>
      <v-card-title>
        <v-spacer/>
        <span>Login</span>
        <v-spacer/>
      </v-card-title>
      <v-card-text>
        <v-form
          v-model="isValidLogin"
          ref="form"
        >
          <v-text-field
            v-model="email"
            color="success"
            label="Email"
            :disabled="loadingLogin"
            :rules="[!!email || 'Email is required', isEmail(email) || 'This is not valid email']"
          />
          <v-text-field
            v-model="password"
            color="success"
            label="Password"
            type="password"
            :disabled="loadingLogin"
            :rules="[!!password || 'Password is required']"
          />
        </v-form>
      </v-card-text>
      <v-card-actions>
        <v-spacer />
        <v-btn
          color="success"
          text
          @click="loginDialog = false"
        >
          Cancel
        </v-btn>
        <v-btn
          color="success"
          text
          :loading="loadingLogin"
          @click="login"
        >
          Login
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import Vue from 'vue'
import { computed, ref, watch } from '@vue/composition-api'
import { isEmail } from '@/lib/utils/validator'

export default Vue.extend({
  setup: (props, ctx) => {
    const store = ctx.root.$store
    const form = ref(null)
    const isValidLogin = ref(true)

    const email = computed({
      get: (): string => store.state.email,
      set: (email: string) => store.commit('setEmail', email)
    })
    const password = computed({
      get: (): string => store.state.password,
      set: (password: string) => store.commit('setPassword', password)
    })
    const loginDialog = computed({
      get: () => store.state.loginDialog,
      set: (dialog: boolean) => store.dispatch('openLoginDialog', dialog)
    })
    const loadingLogin = computed(() => store.state.loadingLogin)

    const login = () => {
      form.value && (form as any).value.validate()

      isValidLogin.value && store.dispatch('login', {
        email: email.value,
        password: password.value
      })
    }

    watch(() => loginDialog.value, () => {
      email.value = ''
      password.value = ''

      form.value && (form as any).value.reset()
    })
    watch(() => store.getters.logged, (isLogged) => {
      if (isLogged) store.commit('openLoginDialog', false)
    })

    return {
      form,
      isValidLogin,

      loginDialog,
      loadingLogin,
      email,
      password,

      login,
      isEmail
    }
  }
})
</script>
