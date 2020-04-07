<template>
  <v-app>
    <app-tool-bar v-if="!noFrame" />
    <app-drawer v-if="!noFrame" />
    <app-login-dialog v-if="!noFrame" />
    <router-view />
  </v-app>
</template>

<script lang="ts">
import Vue from 'vue'
import { onMounted, watch, computed } from '@vue/composition-api'

export default Vue.extend({
  name: 'App',
  setup: (props, ctx) => {
    const store = ctx.root.$store
    const noFrame = computed(() => ctx.root.$route.path === '/activation')

    onMounted(() => store.dispatch('getProfile'))
    watch(() => store.getters.logged, (logged: any) => store.commit('openDrawer', logged))

    return {
      noFrame
    }
  }
})
</script>
