import type { TResumeElement } from "~/utils/preview/core/types"

export const usePreviewStore = defineStore("preview", {
  state: () => ({
    contentLines: new Map<string, string[]>(),
    blocks: new Map<string, TResumeElement>(),
    updateHeightCallback: undefined as (() => void) | undefined
  }),
  actions: {
    setContentLines(lines: Map<string, string[]>) {
      this.contentLines.clear()
      for (const [key, value] of lines) {
        this.contentLines.set(key, value)
      }
    },
    setBlock(id: string, block: TResumeElement) {
      this.blocks.set(id, block)
    },
    getContentLine(contentId: string) {
      return this.contentLines.get(contentId) ?? []
    },
    getBlock(id: string) {
      return this.blocks.get(id) ?? null
    },
    setUpdateHeightCallback(callback: () => void) {
      this.updateHeightCallback = callback
    },
    updateHeight(id: string, height: number) {
      const block = this.blocks.get(id)

      if (block) {
        block.height = height
        this.updateHeightCallback?.()
      }
    }
  }
})
