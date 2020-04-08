<template>
  <v-content class="d-flex align-center justify-center">
    <v-card
      class="ma-auto"
      max-width="350px"
    >
      <v-card-title>
        <v-spacer/>
        <span>Activate account</span>
        <v-spacer/>
      </v-card-title>
      <v-card-text>
        <v-subheader>
          Activate your account and set your password
        </v-subheader>
        <v-form
          v-model="isValidInput"
          ref="form"
          @submit="requestActivation"
          onSubmit="return false;"
        >
          <v-text-field
            v-model="code"
            color="success"
            label="Access code"
            :disabled="loading"
            :rules="[!!code || 'Access code is required']"
          />
          <v-text-field
            v-model="pwd"
            color="success"
            label="Password"
            type="password"
            :disabled="loading"
            :rules="[!!pwd || 'Password is required']"
          />
          <v-text-field
            v-model="confirmPwd"
            color="success"
            label="Confirm Password"
            type="password"
            :disabled="loading"
            :rules="[!!confirmPwd || 'Please confirm password',
              confirmPwd === pwd || 'Confirmation password must match the password']"
          />
        </v-form>
        <a @click="() => { sendAccessCode(); accessCodeNotification = true }">I don't receive access code</a>
        <v-dialog
          v-model="accessCodeNotification"
          max-width="300"
        >
          <v-card>
            <v-card-title>
              Access code
            </v-card-title>
            <v-card-text>
              We're sending you the access code.<br />
              You should receive it soon.<br />
              Please check your inbox.
            </v-card-text>
            <v-card-actions>
              <v-spacer />
              <v-btn
                color="success"
                text
                @click="accessCodeNotification = false"
              >
                OK
              </v-btn>
              <v-spacer />
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-card-text>
      <v-card-actions>
        <v-spacer />
        <v-btn
          color="success"
          text
          :loading="loading"
          :disabled="!code && !pwd"
          @click="requestActivation"
        >
          Activate
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-content>
</template>

<script lang="ts">
import Vue from 'vue'
import { onMounted, ref, watch, computed } from '@vue/composition-api'

export default Vue.extend({
  name: 'Activation',
  setup: (props, ctx) => {
    const activationKey = ref('')
    const isValidInput = ref(true)
    const form: any = ref(null)
    const accessCodeNotification = ref(false)

    const code = ref('')
    const pwd = ref('')
    const confirmPwd = ref('')

    const loading = computed(() => ctx.root.$store.state.activation.loadingAccessCode)

    const sendAccessCode = () => {
      if (activationKey.value) {
        ctx.root.$store.dispatch('activation/sendAccessCode', activationKey.value)
      }
    }

    const requestActivation = () => {
      if (code.value && pwd.value) {
        ctx.root.$store.dispatch('activation/activate', {
          key: activationKey.value,
          code: code.value,
          password: pwd.value
        })
      }
    }

    onMounted(() => {
      const { key }: any = ctx.root.$route.query
      if (!key) ctx.root.$router.push({ name: 'Home' })
      activationKey.value = key
      ctx.root.$router.replace({ query: {} })
    })

    watch(() => ctx.root.$route.params, () => {
      sendAccessCode()
    })

    return {
      form,
      isValidInput,
      accessCodeNotification,

      pwd,
      code,
      confirmPwd,

      loading,

      sendAccessCode,
      requestActivation
    }
  }
})
</script>
