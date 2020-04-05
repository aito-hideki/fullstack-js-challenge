import Vue from 'vue'

export const saveToken = (token: any) => {
  if (token) {
    if (typeof (token) === 'object' && token.access_token && token.refresh_token) {
      localStorage.setItem('voteapp-credential', JSON.stringify(token))
    }
  }
}

export const clearToken = () => {
  localStorage.setItem('voteapp-credential', '')
  Vue.prototype.$utils.navigate('/login')
}

export const getToken = () => {
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

export const isEmptyToken = (token: any) => !(typeof (token) === 'object' && token && token.access_token && token.refresh_token)
