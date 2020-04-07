import { authGuard, noAuthGuard, adminGuard, userGuard, AuthenticationStatus } from './auth'
import { RouteConfig } from 'vue-router'

const authGuardSelector = (path: any) => {
  switch (path.role) {
    case AuthenticationStatus.Logged:
      return authGuard
      break
    case AuthenticationStatus.Admin:
      return adminGuard
      break
    case AuthenticationStatus.User:
      return userGuard
      break
    case AuthenticationStatus.UnLogged:
      return noAuthGuard
      break
    default:
      return undefined
  }
}

const buildRoutes = (paths: any[]): RouteConfig[] => {
  return paths.map(path => path.redirect ? path : {
    ...path,
    path: path.to,
    beforeEnter: authGuardSelector(path),
    component: (resolve: any) => import(`../views/${path.view}.vue`).then(resolve)
  })
}

export const paths = buildRoutes([
  {
    icon: 'mdi-home',
    name: 'Home',
    view: 'Home',
    to: '/'
  },
  {
    icon: 'mdi-account-tie',
    name: 'Administration',
    view: 'Admin',
    to: '/admin',
    role: AuthenticationStatus.Admin
  },
  {
    path: '*',
    redirect: '/'
  }
])
