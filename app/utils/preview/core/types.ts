import type { Component } from "vue"

export interface TBlock {
  id: string
  component: Component
  height: number
}

export type TBlocks =
  | TBlock
  | {
      left: TBlock[]
      right: TBlock[]
    }
