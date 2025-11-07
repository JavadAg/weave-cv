import type { Component } from "vue"

export interface TResumeElement {
  id: string
  component: Component
  height: number
}

export type TResumeElements =
  | TResumeElement
  | {
      leftCol: TResumeElement[]
      rightCol: TResumeElement[]
    }
