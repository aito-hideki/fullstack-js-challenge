<template>
  <v-app>
    <v-app-bar
      app
      color="success darken-1"
      dark
    >
      <h2>Welcome!</h2>

      <v-spacer></v-spacer>

      <v-btn text>
        <span class="mr-2">Login</span>
      </v-btn>
    </v-app-bar>

    <v-content />
  </v-app>
</template>

<script lang="ts">
import Vue from 'vue'
import { onMounted } from '@vue/composition-api'

export default Vue.extend({
  name: 'App',
  setup (props, ctx) {
    onMounted(() => {
      console.log('apple seed')
    })
    return {
    }
  }
})
</script>
