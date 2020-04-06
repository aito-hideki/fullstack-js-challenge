<template>
  <v-app-bar
    :clipped-left="$vuetify.breakpoint.mdAndUp"
    app
    color="success darken-1"
    dark
  >
    <v-row>
      <v-col
        cols="12"
        sm="4"
        class="d-sm-block"
      >
        <v-btn
          icon
          @click="toggleDrawer"
        >
          <v-icon>mdi-menu</v-icon>
        </v-btn>
      </v-col>
      <v-col
        sm="4"
        class="d-none d-sm-flex justify-center align-center"
      >
        <h2 v-if="logged">Welcome User!</h2>
        <h2 v-else>Welcome!</h2>
      </v-col>
      <v-col
        sm="4"
        class="d-none d-sm-flex align-center"
      >
        <v-spacer />
        <v-btn
          v-if="logged"
          text
          @click="logout"
        >
          <span class="mr-2">Log out</span>
        </v-btn>

        <v-dialog
          v-if="!logged"
          v-model="loginDialog"
          max-width="350px"
        >

          <template v-slot:activator="{ on }">
            <v-btn
              text
              v-on="on"
            >
              <span class="mr-2">Login</span>
            </v-btn>
          </template>

          <v-card>
            <v-card-title>
              <v-spacer/>
              <span>Login</span>
              <v-spacer/>
            </v-card-title>
            <v-card-text>
              <v-form
                v-model="valid"
                ref="form"
              >
                <v-text-field
                  v-model="email"
                  color="success"
                  label="Email"
                  :rules="[!!email || 'Email is required', isEmail(email) || 'This is not valid email']"
                />
                <v-text-field
                  v-model="password"
                  color="success"
                  label="Password"
                  type="password"
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
                @click="login"
              >
                Login
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-col>
    </v-row>
  </v-app-bar>
</template>

<script lang="ts">
import Vue from 'vue'
import { ref, watch, computed } from '@vue/composition-api'
import { isEmail } from '@/lib/utils/validator'

export default Vue.extend({
  setup (props, ctx) {
    const form = ref(null)
    const valid = ref(true)
    const loginDialog = ref(false)
    const email = ref('')
    const password = ref('')
    const logged = computed(() => ctx.root.$store.getters.logged)

    const logout = () => ctx.root.$store.dispatch('logout')
    const toggleDrawer = () => ctx.root.$store.commit('toggleDrawer')

    const login = () => {
      ctx.root.$store.dispatch('login', {
        email: email.value,
        password: password.value
      })
    }

    watch(() => loginDialog.value, () => {
      email.value = ''
      password.value = ''

      form.value && (form as any).value.reset()
    })
    watch(() => logged.value, (isLogged) => {
      if (isLogged) loginDialog.value = false
    })

    return {
      form,
      valid,
      loginDialog,
      logged,
      email,
      password,

      toggleDrawer,
      login,
      logout,

      isEmail
    }
  }
})
</script>
