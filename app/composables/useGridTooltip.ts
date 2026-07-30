export function useGridTooltip() {
  const text = ref('')
  const visible = ref(false)
  const left = ref(0)
  const top = ref(0)

  function show(e: MouseEvent, label: string | null | undefined) {
    if (!label) {
      visible.value = false
      return
    }
    text.value = label
    visible.value = true
    const padding = 12
    nextTick(() => {
      const tw = 200
      const th = 28
      let l = e.clientX - tw / 2
      let t = e.clientY - th - 12
      if (l < padding) l = padding
      if (l + tw + padding > window.innerWidth) l = window.innerWidth - tw - padding
      if (t < padding) t = e.clientY + 16
      left.value = l
      top.value = t
    })
  }

  function hide() {
    visible.value = false
  }

  return { text, visible, left, top, show, hide }
}
