import _ from 'lodash'

// Load modules in JSON format
const requireModule = require.context('.', true, /\.ts$/)
const modules: any = {}

requireModule.keys().forEach(fileName => {
  if (fileName === './index.ts') return

  // Replace ./ and .ts
  const path = fileName.replace(/(\.\/|\.ts)/g, '')
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
