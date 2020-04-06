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
        <h2 v-if="logged">Welcome!</h2>
        <h2 v-else-if="isAdmin">Welcome Admin!</h2>
        <h2 v-else>Welcome User!</h2>
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
          <span class="mr-2">Logout</span>
        </v-btn>

        <v-btn
          v-else
          text
          @click="openLoginDialog"
        >
          <span class="mr-2">Login</span>
        </v-btn>
      </v-col>
    </v-row>
  </v-app-bar>
</template>

<script lang="ts">
import Vue from 'vue'
import { computed } from '@vue/composition-api'

export default Vue.extend({
  setup: (props, ctx) => {
    const store = ctx.root.$store

    const logged = computed(() => store.getters.logged)
    const isAdmin = computed(() => store.getters.isAdmin)

    const logout = () => store.dispatch('logout')
    const openLoginDialog = () => store.commit('openLoginDialog', true)
    const toggleDrawer = () => store.commit('toggleDrawer')

    return {
      logged,
      isAdmin,

      toggleDrawer,
      openLoginDialog,
      logout
    }
  }
})
</script>
