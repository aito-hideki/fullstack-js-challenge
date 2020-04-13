import { request } from '@/lib/api'

export default {
  getPolls: async ({ state }: any) => {
    try {
      state.loadingPolls = true
      const { data } = await request({
        method: 'get',
        url: '/poll'
      })
      state.polls = data
    } catch (err) {
      console.log(err)
    } finally {
      state.loadingPolls = false
    }
  },
  createPoll: async ({ state, dispatch }: any, { name, questions }: any) => {
    try {
      state.loadingCreatePoll = true
      await request({
        method: 'post',
        url: '/poll',
        data: { name, questions }
      })

      dispatch('getPolls')
    } catch (err) {
      console.log(err)
    } finally {
      state.loadingCreatePoll = false
    }
  },
  invite: async ({ state }: any, { pollId, email }: any) => {
    try {
      state.loadingSendPoll = true
      await request({
        method: 'post',
        url: `/poll/${pollId}/invite`,
        data: { email }
      })
    } catch (err) {
      console.log(err)
    } finally {
      state.loadingSendPoll = false
    }
  },
  submitAnswer: async ({ state }: any, { pollId, answers }: any) => {
    try {
      state.loadingSubmitPoll = true
      await request({
        method: 'post',
        url: `/poll/${pollId}`,
        data: {
          answers
        }
      })
    } catch (err) {
      console.log(err)
    } finally {
      state.loadingSubmitPoll = false
    }
  }
}
