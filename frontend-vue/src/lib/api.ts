import { getToken, isEmptyToken, clearToken } from './auth'
import Axios, { AxiosRequestConfig } from 'axios'

const { VUE_APP_API } = process.env

const sendRequest = (req: AxiosRequestConfig) => Axios.request(req)

export const requestLogin = (email: string, password: string) => {
  const req: AxiosRequestConfig = {
    method: 'post',
    baseURL: VUE_APP_API,
    url: '/auth/login',
    data: { email, password }
  }

  return sendRequest(req)
}

export const refreshToken = async () => {
  // refresh token
}

export const request = async (req: any, auth = true): Promise<any> => {
  req = {
    baseURL: VUE_APP_API,
    ...req
  }
  if (!auth) return sendRequest(req)
  const headers = req.headers || {}

  let token = getToken()
  if (isEmptyToken(token)) throw new Error('You\'re logged out')

  req.headers = {
    ...headers,
    Authorization: `Bearer ${token.accessToken}`
  }

  let res: any = null

  try {
    res = await sendRequest(req)
  } catch (error) {
    const { response: { status } } = error
    if (status !== 401) throw error
    clearToken()
  }

  if (res) return new Promise((resolve) => resolve(res))

  // refresh token

  token = getToken()
  if (isEmptyToken(token)) throw new Error('You\'re logged out')

  req.headers = {
    ...headers,
    Authorization: token.accessToken
  }

  return sendRequest(req)
}
