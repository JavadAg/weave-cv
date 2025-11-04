import type { Component } from "vue"

export type ResumeElementKind = "heading" | "space" | "personal" | "description" | "detail"

export interface TResumeElement {
  id: string
  component: Component
  height: number
  kind: ResumeElementKind
}

export type TResumeElements =
  | TResumeElement
  | {
      leftCol: TResumeElement[]
      rightCol: TResumeElement[]
    }
