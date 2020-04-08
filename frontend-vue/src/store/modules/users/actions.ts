import { request } from '@/lib/api'

export default {
  getUsers: async ({ state }: any) => {
    try {
      state.loadingUsers = true
      const { data } = await request({
        method: 'get',
        url: '/user'
      })
      state.users = data
    } catch (err) {
      console.log(err)
    } finally {
      state.loadingUsers = false
    }
  },
  inviteUser: async ({ state, dispatch }: any, { email }: { email: string }) => {
    try {
      state.loadingInvite = true
      await request({
        method: 'post',
        url: '/user',
        data: { email }
      })

      dispatch('getUsers')
    } catch (err) {
      console.log(err)
    } finally {
      state.loadingInvite = false
    }
  }
}
