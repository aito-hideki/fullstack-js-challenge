<template>
  <v-navigation-drawer
    v-model="drawer"
    :clipped="$vuetify.breakpoint.mdAndUp"
    width="260"
    class="elevation-5"
    app
  >
    <v-list rounded>
      <v-list-item
        v-for="(item, idx) in menuItems"
        :key="idx"
        :to="item.direct ? undefined: item.to"
        :href="item.direct ? item.to: undefined"
        :target="item.direct ? '_blank' : undefined"
        color="success"
        link
      >
        <v-list-item-action>
          <v-icon>{{ item.icon }}</v-icon>
        </v-list-item-action>
        <v-list-item-content>
          <v-list-item-title>
            {{ item.name }}
          </v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script lang="ts">
import Vue from 'vue'
import { computed } from '@vue/composition-api'
import { menu } from '@/constants/app'

export default Vue.extend({
  setup (props, ctx) {
    const drawer = computed({
      get: () => ctx.root.$store.state.drawer,
      set: (drawer: boolean) => ctx.root.$store.commit('setDrawer', drawer)
    })
    const menuItems = computed(() => menu)

    return {
      drawer,
      menuItems
    }
  }
})
</script>
