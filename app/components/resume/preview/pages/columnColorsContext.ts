import type { InjectionKey, Ref } from "vue"

export interface ColumnColorsContext {
  accentColor: string
  textColor: string
  bgColor: string
}

export const ColumnColorsKey: InjectionKey<Ref<ColumnColorsContext>> = Symbol("ColumnColors")
