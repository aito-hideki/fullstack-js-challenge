import { request } from '@/lib/api'

export default {
  sendAccessCode: async ({ state }: any, key: string) => {
    try {
      state.loadingAccessCode = true
      await request({
        method: 'post',
        url: '/activate/access-code',
        data: { key }
      }, false)
    } catch (err) {
      console.log(err)
    } finally {
      state.loadingAccessCode = false
    }
  },
  activate: async ({ state }: any, { key, code, password }: any) => {
    try {
      state.loadingActivation = true
      await request({
        method: 'post',
        url: '/activate',
        data: { key, code, password }
      }, false)
    } catch (err) {
      console.log(err)
    } finally {
      state.loadingActivation = false
    }
  }
}
