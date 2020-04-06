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
      <v-list-item
        v-if="logged"
        color="success"
        link
        @click="logout"
      >
        <v-list-item-action>
          <v-icon>mdi-login-variant</v-icon>
        </v-list-item-action>
        <v-list-item-content>
          <v-list-item-title>
            Logout
          </v-list-item-title>
        </v-list-item-content>
      </v-list-item>
      <v-list-item
        v-else
        color="success"
        link
        @click="openLoginDialog"
      >
        <v-list-item-action>
          <v-icon>mdi-login-variant</v-icon>
        </v-list-item-action>
        <v-list-item-content>
          <v-list-item-title>
            Login
          </v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script lang="ts">
import Vue from 'vue'
import { computed } from '@vue/composition-api'
import { paths } from '@/constants/app'
import { getToken, isEmptyToken } from '@/lib/auth'
import { AuthenticationStatus } from '@/constants/auth'

export default Vue.extend({
  setup: (props, ctx) => {
    const store = ctx.root.$store

    const drawer = computed({
      get: () => store.state.drawer,
      set: (drawer: boolean) => store.commit('openDrawer', drawer)
    })
    const logged = computed(() => store.getters.logged)
    const menuItems = computed(() => {
      const token = getToken()
      let authStatus: AuthenticationStatus

      if (!store.state.profile) authStatus = AuthenticationStatus.UnLogged
      else if (store.state.profile.isAdmin) authStatus = AuthenticationStatus.Admin
      else authStatus = AuthenticationStatus.User

      return paths.filter((item: any) => !item.redirect)
        .filter((item: any) => !Object.prototype.hasOwnProperty.call(item, 'role') ||
          authStatus === item.role || (
          authStatus !== AuthenticationStatus.UnLogged &&
          item.role === AuthenticationStatus.Logged
        ))
    })
    const openLoginDialog = () => store.commit('openLoginDialog', true)
    const logout = () => store.dispatch('logout')

    return {
      drawer,
      logged,
      menuItems,

      openLoginDialog,
      logout
    }
  }
})
</script>
