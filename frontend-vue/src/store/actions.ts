import { saveToken, clearToken } from '@/lib/auth'
import { toCamelCase } from '@/lib/utils/case-convert'
import { requestLogin, request } from '@/lib/api'

export default {
  login: async ({ state, dispatch }: any, { email, password }: { email: string; password: string }) => {
    try {
      state.loadingLogin = true
      const { data } = await requestLogin(email, password)
      saveToken(toCamelCase(data))
      state.profile = {}
      dispatch('getProfile')
    } catch (error) {
      const { response: { message } } = error
      clearToken()
      state.profile = null
      console.log(message)
    } finally {
      state.loadingLogin = false
    }
  },
  logout: ({ state }: any) => {
    clearToken()
    state.profile = null
  },
  getProfile: async ({ state }: any) => {
    try {
      state.loadingProfile = true
      const { data } = await request({
        method: 'get',
        url: '/profile'
      })
      state.profile = data
    } catch (err) {
      console.log('something went wrong')
    } finally {
      state.loadingProfile = false
    }
  }
}
