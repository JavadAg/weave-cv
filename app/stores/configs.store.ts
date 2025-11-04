import { DEFAULT_CONFIGS } from "~/constants/default"
import type { TConfigs } from "~/utils/schemas/configs/configs.schema"
import type { TSectionType } from "~/utils/schemas/content.schema"

export const useConfigsStore = defineStore("configs", {
  state: () => ({
    configs: DEFAULT_CONFIGS
  }),
  actions: {
    setConfigs(value: TConfigs) {
      this.configs = value
    },
    updateOrder(type: "oneCol" | "twoCol", value: TSectionType[] | { left: TSectionType[]; right: TSectionType[] }) {
      this.$patch((state) => {
        if (type === "oneCol") {
          state.configs.general.layout.order.oneCol = value as TSectionType[]
        } else {
          state.configs.general.layout.order.twoCol = value as {
            left: TSectionType[]
            right: TSectionType[]
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
