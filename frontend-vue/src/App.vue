<template>
  <v-app>
    <app-tool-bar v-if="!noFrame" />
    <app-drawer v-if="!noFrame" />
    <app-login-dialog v-if="!noFrame" />
    <v-slide-x-transition
      v-if="!loadingProfile && !logged"
      mode="out-in"
    >
      <router-view />
    </v-slide-x-transition>
    <v-content
      v-else
      class="d-flex align-center justify-center text-center"
    >
      <v-progress-circular
        class="mx-auto"
        color="success"
        :size="80"
        :width="10"
        indeterminate
      />
    </v-content>
  </v-app>
</template>

<script lang="ts">
import Vue from 'vue'
import { onMounted, watch, computed } from '@vue/composition-api'

export default Vue.extend({
  name: 'App',
  setup: (props, ctx) => {
    const store = ctx.root.$store

    const loadingProfile = computed(() => store.state.loadingProfile)
    const logged = computed(() => store.state.logged)
    const noFrame = computed(() => ctx.root.$route.path === '/activation')

    onMounted(() => store.dispatch('getProfile'))
    watch(() => store.getters.logged, (logged: any) => store.commit('openDrawer', logged))

    return {
      logged,
      noFrame,
      loadingProfile
    }
  }
})
</script>
