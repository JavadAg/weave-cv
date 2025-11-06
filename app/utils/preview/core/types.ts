import type { Component } from "vue"

export type ResumeElementType = "heading" | "space"

export interface TResumeElement {
  id: string
  component: Component
  height: number
  type?: ResumeElementType
}

export type TResumeElements =
  | TResumeElement
  | {
      leftCol: TResumeElement[]
      rightCol: TResumeElement[]
    }
