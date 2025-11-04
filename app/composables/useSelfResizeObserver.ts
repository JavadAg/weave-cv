export function useSelfResizeObserver(callback: (height: number) => void) {
  const elementRef = useTemplateRef<HTMLElement>("elementRef")

  const height = ref<number>(0)
  let resizeObserver: ResizeObserver | null = null

  const updateHeight = () => {
    if (elementRef.value) {
      const element = elementRef.value
      const totalHeight = element.offsetHeight
      height.value = totalHeight
      callback(totalHeight)
    }
  }

  onMounted(() => {
    if (elementRef.value) {
      resizeObserver = new ResizeObserver(() => {
        updateHeight()
      })
      resizeObserver.observe(elementRef.value, { box: "border-box" })
      nextTick(() => {
        updateHeight()
      })
    }
  })

  onUnmounted(() => {
    if (resizeObserver) {
      resizeObserver.disconnect()
    }
  })

  watch(elementRef, (newElement) => {
    if (resizeObserver) {
      resizeObserver.disconnect()
    }

    if (newElement) {
      resizeObserver = new ResizeObserver(() => {
        updateHeight()
      })
      resizeObserver.observe(newElement, { box: "border-box" })
      nextTick(() => {
        updateHeight()
      })
    }
  })

  return {
    elementRef,
    updateHeight
  }
}
