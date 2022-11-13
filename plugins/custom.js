

// export { getFromCache, setCache, removeCache }
export default (context, inject) => {
  inject('getNavH', () => context.$vuetify.breakpoint.smAndDown ? 56 : 64)
  inject('getIsMobile', () => {
    const userAgent =process.client ? navigator?.userAgent : context?.req?.headers?.['user-agent']
    const isMobile =  userAgent?.includes("Mobi");
    return isMobile ? context.$vuetify.breakpoint.smAndDown : false
  })
  inject('getWinW', () => typeof window === 'undefined' ? 0 : window.innerWidth)
  inject('getWinH', () => typeof window === 'undefined' ? 0 : window.innerHeight)
}