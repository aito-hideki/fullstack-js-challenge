import { isEmptyToken, getToken } from '@/lib/auth'

export enum AuthenticationStatus {
  Logged = 1,
  UnLogged,
  Admin,
  User
}

export const authGuard = (to: any, from: any, next: any) => {
  const isLogged = !isEmptyToken(getToken())

  if (!isLogged && to.name !== 'Home') next({ name: 'Home' })
  next()
}

export const noAuthGuard = (to: any, from: any, next: any) => {
  const isLogged = !isEmptyToken(getToken())

  if (isLogged && to.name !== 'Home') next({ name: 'Home' })
  next()
}

export const adminGuard = (to: any, from: any, next: any) => {
  const token = getToken()
  const isLogged = !isEmptyToken(token)

  if ((!isLogged || !token.isAdmin) && to.name !== 'Home') next({ name: 'Home' })
  next()
}

export const userGuard = (to: any, from: any, next: any) => {
  const token = getToken()
  const isLogged = !isEmptyToken(token)

  if ((!isLogged || token.isAdmin) && to.name !== 'Home') next({ name: 'Home' })
  next()
}
