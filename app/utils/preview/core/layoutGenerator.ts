import type { TLayout } from "~/utils/schemas/configs/generalConfigs.schema"
import type { TPersonalPosition } from "~/utils/schemas/shared.schema"

export type TSectionsOrder = Array<string | { left: string[]; right: string[] }>

export function createSingleColumnLayout(order: TLayout["order"]) {
  return ["personal", "space", ...order.oneCol]
}

export function createTwoColumnLayout(order: TLayout["order"], personalPosition: TPersonalPosition) {
  const firstColumn = {
    left: [...order.twoCol.left],
    right: [...order.twoCol.right]
  }

  switch (personalPosition) {
    case "top": {
      return ["personal", "space", firstColumn]
    }
    case "left": {
      return [{ left: ["personal", ...firstColumn.left], right: firstColumn.right }]
    }
    case "right": {
      return [{ left: firstColumn.left, right: ["personal", ...firstColumn.right] }]
    }
  }
}

export function generateSectionsOrder(layout: TLayout): TSectionsOrder {
  switch (layout.columns) {
    case "1": {
      return createSingleColumnLayout(layout.order)
    }
    case "2": {
      return createTwoColumnLayout(layout.order, layout.personalPosition)
    }
  }
}
