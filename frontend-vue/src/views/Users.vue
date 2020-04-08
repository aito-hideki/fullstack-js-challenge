<template>
  <v-content class="user">
    <v-container class="pa-6">
      <h1 class="text-center mb-4">Users</h1>
      <v-row no-gutters>
        <v-spacer />
        <v-dialog
          v-model="inviteDialog"
          max-width="350px"
        >
          <template v-slot:activator="{ on }">
            <v-btn
              color="success"
              v-on="on"
            >
              Invite an User
            </v-btn>
          </template>
          <v-form
            v-model="isValidInvite"
            ref="form"
            @submit="invite"
            onSubmit="return false;"
          >
            <v-card>
              <v-card-title>
                <v-spacer/>
                <span>Invite an User</span>
                <v-spacer/>
              </v-card-title>
              <v-card-text>
                <v-text-field
                  v-model="email"
                  color="success"
                  label="Email"
                  :disabled="loadingInvite"
                  :rules="[!!email || 'Email is required', isEmail(email) || 'This is not valid email']"
                />
              </v-card-text>
              <v-card-actions>
                <v-spacer />
                <v-btn
                  color="success"
                  text
                  @click="inviteDialog = false"
                >
                  Cancel
                </v-btn>
                <v-btn
                  color="success"
                  type="submit"
                  text
                  :loading="loadingInvite"
                >
                  Invite
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-form>
        </v-dialog>
      </v-row>
      <v-data-table
        :headers="adminsHeader"
        :items="items"
        :loading="loadingAdmins"
        item-key="userId"
      />
    </v-container>
  </v-content>
</template>

<script lang="ts">
import { ref, computed, onMounted, watch } from '@vue/composition-api'
import { adminsHeader } from '@/constants/tables'
import { isEmail } from '@/lib/utils/validator'

export default {
  name: 'User',
  setup: (props: any, state: any) => {
    const store = state.root.$store

    const form: any = ref(null)
    const inviteDialog: any = ref(false)
    const isValidInvite = ref(false)
    const email = ref('')

    const items = computed(() => store.state.users.users.map((user: any) => ({
      ...user,
      email: store.state.profile.email === user.email ? `${user.email} (You)` : user.email,
      active: user.active ? 'Active' : 'Inactive'
    })))
    const loadingAdmins = computed(() => store.state.users.loadingAdmins)
    const loadingInvite = computed(() => store.state.users.loadingInvite)

    watch(() => loadingInvite.value, (loading) => {
      if (loading) inviteDialog.value = false
    })

    const invite = () => {
      form.value && (form as any).value.validate()

      isValidInvite.value && store.dispatch('users/inviteUser', { email: email.value })
    }

    onMounted(() => {
      store.dispatch('users/getUsers')
    })

    return {
      form,
      inviteDialog,
      isValidInvite,
      invite,

      email,
      adminsHeader,
      items,

      loadingAdmins,
      loadingInvite,

      isEmail
    }
  }
}
</script>
