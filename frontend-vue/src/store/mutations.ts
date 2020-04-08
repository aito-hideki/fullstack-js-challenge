import { isEmptyToken, getToken } from '@/lib/auth'

export default {
  toggleDrawer: (state: any) => {
    state.drawer = !state.drawer
  },
  openDrawer: (state: any, drawer: boolean) => {
    state.drawer = drawer
  },
  openLoginDialog: (state: any, dialog: boolean) => {
    state.loginDialog = dialog
  },
  setEmail: (state: any, email: string) => {
    state.email = email
  },
  setPassword: (state: any, password: string) => {
    state.password = password
  },
  checkLoginStatus: (state: any) => {
    if (isEmptyToken(getToken())) state.profile = null
  }
}
