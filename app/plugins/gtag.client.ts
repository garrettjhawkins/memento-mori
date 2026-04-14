export default defineNuxtPlugin(() => {
  if (!import.meta.client) return
  const s1 = document.createElement('script')
  s1.async = true
  s1.src = 'https://www.googletagmanager.com/gtag/js?id=G-ZEKX6ET0ST'
  document.head.appendChild(s1)
  const s2 = document.createElement('script')
  s2.innerHTML = `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js', new Date());gtag('config','G-ZEKX6ET0ST');`
  document.head.appendChild(s2)
})
