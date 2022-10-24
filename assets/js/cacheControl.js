import jsCookies from 'js-cookie'

function getFromCache(key) {
  let savedUserData = null
  if (localStorage) {
    const originalData = localStorage.getItem(key)
    try {
      savedUserData = JSON.parse(originalData)
    } catch (_) {
      if (typeof originalData === 'string') {
        savedUserData = originalData
      } else {
        savedUserData = null
      }
    }
  } else {
    savedUserData = jsCookies.get(key)
  }
  return savedUserData
}

function setCache(key, value, expires = 7) {
  const valueStr = JSON.stringify(value)
  if (localStorage) {
    localStorage.setItem(key, valueStr)
  } else {
    jsCookies.set(
      key,
      value,
      { expires })
  }
}

function removeCache(key) {
  if (localStorage) {
    localStorage.removeItem(key)
  } else {
    jsCookies.remove(key)
  }
}

export { getFromCache, setCache, removeCache }
