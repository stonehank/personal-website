

// export { getFromCache, setCache, removeCache }
export default (context, inject) => {
  inject('getNavH', () => context.$vuetify.breakpoint.smAndDown ? 56 : 64)
  inject('getIsMobile', () => context.$vuetify.breakpoint.smAndDown)
  inject('getWinW', () => typeof window === 'undefined' ? 0 : window.innerWidth)
  inject('getWinH', () => typeof window === 'undefined' ? 0 : window.innerHeight)
}