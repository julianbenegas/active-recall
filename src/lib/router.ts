import { isDev, originURL } from 'lib/constants'
import { NextRouter } from 'next/router'
import { ParsedUrlQuery } from 'querystring'

type QueryParams = { [key: string]: string | null }

const getHref = (
  asPath: string,
  newQueryParams: QueryParams,
  override = true
) => {
  const uri = new URL(asPath, originURL)

  Object.keys(newQueryParams).forEach((key) => {
    const value = newQueryParams[key]
    if (value === null) {
      if (override) uri.searchParams.delete(key)
      return
    }
    if (uri.searchParams.has(key) && override) {
      uri.searchParams.delete(key)
    }
    uri.searchParams.append(key, value)
  })

  return `${uri.pathname}${uri.search}`
}

const makeQuery = (router: NextRouter, queryParams: QueryParams) =>
  router.push(getHref(router.asPath, queryParams))

const flattenQueryItem = (q: string | string[] | undefined) => {
  if (!q) return null
  if (typeof q === 'string') return q
  return q[0] ?? null
}

const flattenQuery = (query: ParsedUrlQuery) => {
  const flattened: Record<string, string | null> = {}
  Object.keys(query).map((key) => {
    flattened[key] = flattenQueryItem(query[key])
  })
  return flattened
}

const checkIfExternal = (url: string) => {
  try {
    const originUri = new URL('/', originURL)
    const uri = new URL('/', url)
    if (uri.origin === originUri.origin) return false
    return true
  } catch (error) {
    return false
  }
}

function isInRoute(routerPathname: string, candidatePathname: string) {
  try {
    const realUrl = new URL(routerPathname, originURL)
    const candidateUrl = new URL(candidatePathname, originURL)
    const realParts = realUrl.pathname.split('/')
    const candidateParts = candidateUrl.pathname.split('/')
    return candidateParts.every((part, i) => part === realParts[i])
  } catch (error) {
    if (isDev) throw error
    return false
  }
}

export {
  makeQuery,
  getHref,
  flattenQueryItem,
  flattenQuery,
  checkIfExternal,
  isInRoute
}
