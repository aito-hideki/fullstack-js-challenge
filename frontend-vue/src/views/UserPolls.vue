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
                  :to="`/user-polls/${item.pollId}`"
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
    </v-container>
  </v-content>
</template>

<script lang="ts">
import Vue from 'vue'
import { ref, onMounted, Ref, computed, watch } from '@vue/composition-api'
import { userPollsHeader } from '@/constants/tables'

export default Vue.extend({
  name: 'Polls',
  setup: (props, ctx) => {
    const store = ctx.root.$store

    const polls = computed(() => store.state.polls.polls.map((poll: any) => ({ ...poll, questions: poll.questions.length })))
    const loadingPolls = computed(() => store.state.polls.loadingPolls)

    onMounted(() => {
      store.dispatch('polls/getPolls')
    })

    return {
      userPollsHeader,
      polls
    }
  }
})
</script>
