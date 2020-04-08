import Router from '@/router'

export const saveToken = (token: any) => {
  if (token) {
    if (typeof (token) === 'object' && token.accessToken) {
      localStorage.setItem('voteapp-credential', JSON.stringify(token))

      Router.app.$store.commit('checkLoginStatus')
      if (Router.currentRoute.name !== 'Home') Router.push({ name: 'Home' })
    }
  }
}

export const clearToken = () => {
  localStorage.setItem('voteapp-credential', '')

  Router.app.$store.commit('checkLoginStatus')
  if (Router.currentRoute.name !== 'Home') Router.push({ name: 'Home' })
}

export const getToken = (): any => {
  let token = localStorage.getItem('voteapp-credential')
  if (token) {
    try {
      token = JSON.parse(token)
      if (!isEmptyToken(token)) {
        return token
      }
    } catch (err) {
      console.log('- Encountered an error while fetching token -')
    }
  }
  return null
}

export const isEmptyToken = (token: any): boolean => !(typeof (token) === 'object' && token && token.accessToken)
