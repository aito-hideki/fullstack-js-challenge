<template>
  <v-app>
    <app-tool-bar />
    <app-drawer />

    <router-view />
  </v-app>
</template>

<script lang="ts">
import Vue from 'vue'
import { onMounted, watch } from '@vue/composition-api'

export default Vue.extend({
  name: 'App',
  setup: (props, ctx) => {
    onMounted(() => {
      ctx.root.$store.dispatch('getProfile')
    })
    watch(() => ctx.root.$store.getters.logged, (logged: any) => ctx.root.$store.commit('setDrawer', logged))

    return {}
  }
})
</script>
