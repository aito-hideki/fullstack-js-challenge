import { request } from '@/lib/api'

export default {
  getAdmins: async ({ state }: any) => {
    try {
      state.loadingAdmins = true
      const { data } = await request({
        method: 'get',
        url: '/admin/all'
      })
      state.admins = data
    } catch (err) {
      console.log(err)
    } finally {
      state.loadingAdmins = false
    }
  },
  inviteAdmin: async ({ state, dispatch }: any, { email }: { email: string }) => {
    try {
      state.loadingInvite = true
      await request({
        method: 'post',
        url: '/admin',
        data: { email }
      })

      dispatch('getAdmins')
    } catch (err) {
      console.log(err)
    } finally {
      state.loadingInvite = false
    }
  }
}
