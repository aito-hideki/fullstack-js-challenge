import { request } from '@/lib/api'
import Router from '@/router'

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

      if (Router.currentRoute.name !== 'Home') Router.push({ name: 'Home' })
    } catch (err) {
      console.log(err)
    } finally {
      state.loadingActivation = false
    }
  }
}
