<template>
  <v-content class="polls">
    <v-container class="pa-6">
      <h1 class="text-center mb-4">Polls</h1>
      <v-data-table
        :headers="userPollsHeader"
        :items="polls"
        :loading="loadingPolls"
        item-key="pollId"
      >
        <template v-slot:item.actions="{ item }">
          <td class="d-flex flex-row-reverse align-center">
            <v-tooltip bottom>
              <template v-slot:activator="{ on }">
                <v-btn
                  icon
                  @click="answer(item.pollId)"
                  v-on="on"
                >
                  <v-icon color="info">mdi-chat-alert</v-icon>
                </v-btn>
              </template>
              <span>Answer to the Poll</span>
            </v-tooltip>
          </td>
        </template>
      </v-data-table>

      <v-dialog v-model="questDialog" width="600">
        <v-card>
          <v-card-title>{{ questForm.name }}</v-card-title>
          <v-card-text>
            <v-checkbox
              v-for="(question, idx) in questForm.questions"
              :key="idx"
              v-model="question[1]"
              :label="question[0]"
            />
          </v-card-text>
          <v-card-actions>
            <v-spacer />
            <v-btn
              color="success"
              text
              @click="submit"
            >
              Submit
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>

      <v-dialog v-model="thanksDialog" width="300">
        <v-card>
          <v-card-title>
            Thank you!
          </v-card-title>
          <v-card-text>
            Thanks for answering the questions
          </v-card-text>
        </v-card>
      </v-dialog>
    </v-container>
  </v-content>
</template>

<script lang="ts">
import Vue from 'vue'
import { ref, onMounted, computed } from '@vue/composition-api'
import { userPollsHeader } from '@/constants/tables'

export default Vue.extend({
  name: 'Polls',
  setup: (props, ctx) => {
    const store = ctx.root.$store

    const polls = computed(() => store.state.polls.polls.map((poll: any) => ({ ...poll, quests: poll.questions.length })))
    const loadingPolls = computed(() => store.state.polls.loadingPolls)

    const questDialog = ref(false)
    const questForm = ref({
      id: -1,
      name: '',
      questions: []
    })
    const thanksDialog = ref(false)

    const formatForm = () => {
      questForm.value = {
        id: -1,
        name: '',
        questions: []
      }
    }

    const answer = (idx: number) => {
      questDialog.value = true
      const targetPoll = polls.value.filter((p: any) => p.pollId === idx)[0]
      questForm.value = {
        id: idx,
        name: targetPoll.name,
        questions: targetPoll.questions.map((q: string) => [q, false])
      }
    }

    const submit = () => {
      console.log({ ...questForm.value })
      store.dispatch('polls/submitAnswer', {
        pollId: questForm.value.id,
        answers: questForm.value.questions.map(q => q[1])
      })
      questDialog.value = false
      thanksDialog.value = true
    }

    onMounted(() => {
      store.dispatch('polls/getPolls')
    })

    return {
      userPollsHeader,
      polls,
      loadingPolls,
      thanksDialog,

      questDialog,
      answer,
      submit,
      questForm
    }
  }
})
</script>
