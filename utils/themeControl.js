import { getFromCache, setCache } from './cacheControl'
const cookiesKey = 'pw-theme-color'

const defaultColor = 'light'

function getTheme() {
    let backgroundColor = getFromCache(cookiesKey)
    if (backgroundColor == null) {
        backgroundColor = defaultColor
        setTheme(backgroundColor)
    }
    return backgroundColor
}

function setTheme(newTheme) {
    setCache(cookiesKey, newTheme)
}

function renderThemeOnHTML(backgroundColor) {
    $('html').removeClass('pw-theme-light')
    $('html').removeClass('pw-theme-dark')
    $('html').addClass('pw-theme-' + backgroundColor)
}

export { getTheme, setTheme, renderThemeOnHTML }
