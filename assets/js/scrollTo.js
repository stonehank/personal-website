export default function scrollTo(top = 0, immediate = false) {
  let realTop = 0.001
  if (typeof top === 'number') {
    realTop = top
  } else if (typeof top === 'string') {
    if ($(top).length === 0) {
      console.log('The parameter element not exist')
      return
    }
    realTop = Math.floor(Math.max(realTop, $(top).offset().top - ($('#nav-header').outerHeight()) - 8))
  }
  try {
    // $('html,body').animate({scrollTop:realTop},400);
    window.scrollTo({
      top: realTop,
      behavior: immediate ? 'instant' : 'smooth'
    })
  } catch (_) {
    (document.documentElement || document.body).scrollTop = realTop
  }

}
