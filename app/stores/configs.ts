import { DEFAULT_CONFIGS } from "~/constants/default"
import type { TConfigs } from "~/types/resume.types"
import type { SectionType } from "~/utils/schemas/content.schema"

export const useConfigsStore = defineStore("configs", {
  state: () => ({
    configs: DEFAULT_CONFIGS
  }),
  actions: {
    setConfigs(value: TConfigs) {
      this.configs = value
    },
    updateOrder(type: "oneCol" | "twoCol", value: SectionType[] | { left: SectionType[]; right: SectionType[] }) {
      this.$patch((state) => {
        if (type === "oneCol") {
          state.configs.general.layout.order.oneCol = value as SectionType[]
        } else {
          state.configs.general.layout.order.twoCol = value as {
            left: SectionType[]
            right: SectionType[]
          }
        }
      })
    },
    updateConfig(path: string, value: unknown) {
      this.$patch((state) => {
        const keys = path.split(".")
        if (keys.length === 0) return

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        let target: any = state.configs
        for (let i = 0; i < keys.length - 1; i++) {
          target = target[keys[i]!]
        }
        target[keys.at(-1)!] = value
      })
    }
  }
})
