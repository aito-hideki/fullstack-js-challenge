import * as _ from 'lodash'

export const toCamelCase = (res: any) => {
  return Object.keys(res).reduce((acc: any, cur: string) => {
    acc[_.camelCase(cur)] = caseConvert(res[cur], true)
    return acc
  }, {})
}

export const toSnakecase = (res: any) => {
  return Object.keys(res).reduce((acc: any, cur: string) => {
    acc[_.snakeCase(cur)] = caseConvert(res[cur], false)
    return acc
  }, {})
}

export const caseConvert = (obj: any, toCamel = true): any => {
  if (typeof obj === 'object') {
    if (!obj) { return obj }
    if (Array.isArray(obj)) { return obj.map(e => caseConvert(e, toCamel)) }

    if (toCamel) {
      return toCamelCase(obj)
    } else {
      return toSnakecase(obj)
    }
  }
  return obj
}
