import { inject, provide, ref, type InjectionKey, type Ref } from "vue"
import type { TResumeElement } from "~/utils/preview/core/types"

export type UpdateElementHeightFn = (id: string, height: number) => void

interface IElementHeightContext {
  updateHeight: UpdateElementHeightFn
  resumeElementsRef: Ref<Record<string, TResumeElement>>
}

export const ElementHeightContextKey: InjectionKey<IElementHeightContext> = Symbol("elementHeightUpdate")

export function useElementHeightContext() {
  const resumeElementsRef = ref<Record<string, TResumeElement>>({})
  const updatePagesCallbackRef = ref<(() => void) | undefined>(undefined)

  const updateHeight = (id: string, height: number) => {
    const element = resumeElementsRef.value[id]

    if (element) {
      element.height = height
      updatePagesCallbackRef.value?.()
    }
  }

  const context: IElementHeightContext = {
    updateHeight,
    resumeElementsRef
  }

  provide(ElementHeightContextKey, context)

  return {
    ...context,
    setUpdatePagesCallback: (callback: () => void) => {
      updatePagesCallbackRef.value = callback
    }
  }
}

export function useElementHeightUpdate() {
  const context = inject(ElementHeightContextKey)

  if (!context) {
    throw new Error("useElementHeightUpdate must be used within a component that provides ElementHeightContext")
  }

  return context
}
