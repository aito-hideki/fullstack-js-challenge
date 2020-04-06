import _ from 'lodash'

// Load modules in JSON format
const requireModule = require.context('.', true, /\.js$/)
const modules: any = {}

requireModule.keys().forEach(fileName => {
  if (fileName === './index.js') return

  // Replace ./ and .js
  const path = fileName.replace(/(\.\/|\.js)/g, '')
  const modulePath = path.split('/')
  const moduleName = modulePath.slice(0, modulePath.length - 1).join('/')
  const imported = modulePath[modulePath.length - 1]

  _.set(modules, [moduleName, imported], requireModule(fileName).default)
})

export default Object.keys(modules).reduce((res: any, path: string) => {
  res[path] = {
    ...modules[path],
    namespaced: true
  }
  return res
}, {})
