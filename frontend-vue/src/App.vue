<template>
  <v-app>
    <app-tool-bar />
    <app-drawer />
    <app-login-dialog />
    <router-view />
  </v-app>
</template>

<script lang="ts">
import Vue from 'vue'
import { onMounted, watch } from '@vue/composition-api'

export default Vue.extend({
  name: 'App',
  setup: (props, ctx) => {
    const store = ctx.root.$store

    onMounted(() => store.dispatch('getProfile'))
    watch(() => store.getters.logged, (logged: any) => store.commit('openDrawer', logged))

    return {}
  }
})
</script>
