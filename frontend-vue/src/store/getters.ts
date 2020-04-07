import { isEmptyToken, getToken } from '@/lib/auth'

export default {
  logged: (state: any) => !!state.profile && !isEmptyToken(getToken()),
  isAdmin: (state: any) => !!state.profile && state.profile.isAdmin && !isEmptyToken(getToken()) && getToken().isAdmin
}
