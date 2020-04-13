<template>
  <v-content class="polls">
    <v-container class="pa-6">
      <h1 class="text-center mb-4">Polls</h1>
      <v-row no-gutters>
        <v-spacer />
        <v-dialog
          v-model="pollDialog"
          persistent
          scrollable
          max-width="600"
        >
          <template v-slot:activator="{on}">
            <v-btn
              color="success"
              v-on="on"
              @click="formatDialog"
            >
              Create a Poll
            </v-btn>
          </template>
          <v-form
            ref="form"
            @submit="create"
            onSubmit="return false"
          >
            <v-card>
              <v-card-title>
                <v-spacer />
                Create a new Poll
                <v-spacer />
              </v-card-title>
              <v-divider />
              <v-card-subtitle class="d-flex flex-column align-stretch mt-4">
                <v-text-field
                  v-model="pollName"
                  label="Poll Name"
                  color="success"
                  outlined
                  required
                  :rules="[!!pollName || 'This field is required.']"
                />
                <v-form
                  @submit="addQuestion"
                  onSubmit="return false;"
                >
                  <v-row
                    class="d-flex align-center"
                    no-gutters
                  >
                      <v-text-field
                        v-model="newPoll"
                        label="New question"
                        color="success"
                        outlined
                        required
                        hide-details
                        :rules=[!!newPoll]
                      />
                      <v-tooltip bottom>
                        <template v-slot:activator="{ on }">
                          <v-btn
                            class="ml-n5"
                            :color="newPoll ? 'success' : 'error'"
                            type="submit"
                            fab
                            small
                            v-on="on"
                          >
                            <v-icon>mdi-plus</v-icon>
                          </v-btn>
                        </template>
                        <span>Add Question</span>
                      </v-tooltip>
                  </v-row>
                </v-form>
              </v-card-subtitle>
              <v-divider />
              <v-card-text :style="{ 'max-height': 'calc(100vh - 200px)' }">
                <div
                  v-if="!newPolls.length"
                  class="subtitle-1 text-center mt-3"
                >No Questions Added</div>
                <v-list v-else>
                  <v-list-item
                    v-for="(poll, idx) in newPolls"
                    :key="idx"
                  >
                    <v-list-item-content>
                      <v-list-item-title v-text="poll" />
                    </v-list-item-content>

                    <v-list-item-action>
                      <v-tooltip bottom>
                        <template v-slot:activator="{ on }">
                          <v-btn
                            @click="removeQuestion(idx)"
                            icon
                            v-on="on"
                          >
                            <v-icon color="error">mdi-delete</v-icon>
                          </v-btn>
                        </template>
                        <span>Delete</span>
                      </v-tooltip>
                    </v-list-item-action>
                  </v-list-item>
                </v-list>
              </v-card-text>
              <v-divider />
              <v-card-actions>
                <v-btn
                  color="success"
                  text
                  @click="pollDialog = false"
                >
                  Close
                </v-btn>
                <v-spacer />
                <v-btn
                  color="success"
                  text
                  :disabled="!pollName || !newPolls.length"
                  :loading="loadingCreatePoll"
                  @click="create"
                >
                  Create
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-form>
        </v-dialog>
      </v-row>
      <v-data-table
        :headers="pollsHeader"
        :items="polls"
        :loading="loadingPolls"
        item-key="userId"
      >
        <template v-slot:item.actions="{ item }">
          <td class="d-flex flex-row-reverse align-center">
            <v-form ref="sendPollForm">
              <v-dialog
                v-model="sendPollDlg"
                width="400"
              >
                <template v-slot:activator="{ on: dialog }">
                  <v-tooltip bottom>
                    <template v-slot:activator="{ on: tooltip }">
                      <v-btn
                        icon
                        v-on="{ ...tooltip, ...dialog }"
                      >
                        <v-icon color="info">mdi-email-send</v-icon>
                      </v-btn>
                    </template>
                    <span>Send Poll</span>
                  </v-tooltip>
                </template>

                <v-card>
                  <v-card-title>
                    Please enter an email to send this poll
                  </v-card-title>
                  <v-card-text>
                    <v-text-field
                      v-model="inviteToPoll"
                      label="Email"
                      color="success"
                      outlined
                      :rules="[!!inviteToPoll || 'Email is required', isEmail(inviteToPoll) || 'This is not valid email']"
                    />
                  </v-card-text>
                  <v-card-actions>
                    <v-btn
                      color="success"
                      text
                      @click="sendPollDlg = false"
                    >
                      Cancel
                    </v-btn>
                    <v-spacer />
                    <v-btn
                      color="success"
                      text
                      :disabled="!isEmail(inviteToPoll)"
                      @click="() => sendPoll(item.pollId)"
                    >
                      Send
                    </v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>
            </v-form>
          </td>
        </template>
      </v-data-table>
    </v-container>
  </v-content>
</template>

<script lang="ts">
import Vue from 'vue'
import { ref, onMounted, Ref, computed, watch } from '@vue/composition-api'
import { pollsHeader } from '@/constants/tables'
import { isEmail } from '../lib/utils/validator'

export default Vue.extend({
  name: 'Polls',
  setup: (props, ctx) => {
    const form = ref(null)
    const store = ctx.root.$store

    const sendPollDlg = ref(false)
    const sendPollForm = ref(false)
    const pollDialog = ref(false)

    const pollName = ref('')
    const newPoll = ref('')
    const newPolls: Ref<string[]> = ref([])

    const polls = computed(() => store.state.polls.polls)
    const loadingPolls = computed(() => store.state.polls.loadingPolls)
    const loadingCreatePoll = computed(() => store.state.polls.loadingCreatePoll)

    const inviteToPoll = ref('')

    const sendPoll = (pollId: number) => {
      if (!isEmail(inviteToPoll.value)) return
      store.dispatch('polls/invite', { pollId, email: inviteToPoll.value })
      sendPollDlg.value = false
    }

    const formatDialog = () => {
      form.value && (form as any).value.reset()
      pollName.value = ''
      newPolls.value = []
    }

    const addQuestion = () => {
      if (!newPoll.value) return
      newPolls.value = [...newPolls.value, newPoll.value]
      newPoll.value = ''
    }
    const removeQuestion = (idx: number) => newPolls.value.splice(idx, 1)
    const create = () => {
      form.value && (form as any).value.validate()
      if (!pollName.value || !newPolls.value.length) return

      store.dispatch('polls/createPoll', {
        name: pollName.value,
        questions: newPolls.value
      })
    }

    watch(() => loadingPolls.value, (loading) => { if (loading) pollDialog.value = false })
    watch(() => sendPollDlg.value, () => {
      inviteToPoll.value = ''
      sendPollForm.value && (sendPollForm.value as any).reset()
    })

    onMounted(() => {
      store.dispatch('polls/getPolls')
      formatDialog()
    })

    return {
      form,
      pollDialog,
      sendPollDlg,

      pollsHeader,
      polls,
      pollName,
      newPoll,
      newPolls,
      inviteToPoll,
      loadingPolls,
      loadingCreatePoll,

      isEmail,
      create,
      addQuestion,
      removeQuestion,
      sendPoll,
      formatDialog
    }
  }
})
</script>
