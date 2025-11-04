import { inject, provide, type InjectionKey, type Ref } from "vue"

interface IContentFragmentsContext {
  contentFragments: Ref<Record<string, string[]>>
}

export const ContentFragmentsContextKey: InjectionKey<IContentFragmentsContext> = Symbol("contentFragments")

export function useContentFragmentsContext(contentFragments: Ref<Record<string, string[]>>) {
  const context: IContentFragmentsContext = {
    contentFragments
  }

  provide(ContentFragmentsContextKey, context)

  return context
}

export function useContentFragments() {
  const context = inject(ContentFragmentsContextKey)

  if (!context) {
    throw new Error("useContentFragments must be used within a component that provides ContentFragmentsContext")
  }

  return context
}
