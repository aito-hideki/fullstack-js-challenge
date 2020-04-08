<template>
  <v-content class="admin">
    <v-container class="pa-6">
      <h1 class="text-center mb-4">Administrators</h1>
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
              Invite an Admin
            </v-btn>
          </template>
          <v-card>
            <v-card-title>
              <v-spacer/>
              <span>Invite an Admin</span>
              <v-spacer/>
            </v-card-title>
            <v-card-text>
              <v-form
                v-model="isValidInvite"
                ref="form"
                @submit="invite"
                onSubmit="return false;"
              >
                <v-text-field
                  v-model="email"
                  color="success"
                  label="Email"
                  :disabled="loadingInvite"
                  :rules="[!!email || 'Email is required', isEmail(email) || 'This is not valid email']"
                />
              </v-form>
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
                text
                :loading="loadingInvite"
                @click="invite"
              >
                Invite
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-row>
      <v-data-table
        :headers="adminsHeader"
        :items="items"
        :loading="loadingAdmins"
        item-key="adminId"
      />
    </v-container>
  </v-content>
</template>

<script lang="ts">
import { ref, computed, onMounted, watch } from '@vue/composition-api'
import { adminsHeader } from '@/constants/tables'
import { isEmail } from '@/lib/utils/validator'

export default {
  name: 'Admin',
  setup: (props: any, state: any) => {
    const store = state.root.$store

    const form: any = ref(null)
    const inviteDialog: any = ref(false)
    const isValidInvite = ref(false)
    const email = ref('')

    const items = computed(() => store.state.admin.admins.map((admin: any) => ({
      ...admin,
      email: store.state.profile.email === admin.email ? `${admin.email} (You)` : admin.email,
      active: admin.active ? 'Active' : 'Inactive'
    })))
    const loadingAdmins = computed(() => store.state.admin.loadingAdmins)
    const loadingInvite = computed(() => store.state.admin.loadingInvite)

    watch(() => loadingInvite.value, (loading) => {
      if (loading) inviteDialog.value = false
    })

    const invite = () => {
      form.value && (form as any).value.validate()

      isValidInvite.value && store.dispatch('admin/inviteAdmin', { email: email.value })
    }

    onMounted(() => {
      store.dispatch('admin/getAdmins')
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
