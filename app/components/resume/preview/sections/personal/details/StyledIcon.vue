<script setup lang="ts">
import { computed, h } from "vue"
import type { TIconStyle } from "~/utils/schemas/shared.schema"

interface Props {
  size: number
  style: TIconStyle
  color?: string
  icon?: string
}

const props = withDefaults(defineProps<Props>(), {
  color: "currentColor",
  icon: undefined
})

type FrameType = "none" | "circle" | "square"
type FrameStyle = "fill" | "outline"

const STYLE_CONFIG: Record<TIconStyle, { type: FrameType; frameStyle: FrameStyle }> = {
  simple: { type: "none", frameStyle: "fill" },
  filledRounded: { type: "circle", frameStyle: "fill" },
  filledSquare: { type: "square", frameStyle: "fill" },
  outlineRounded: { type: "circle", frameStyle: "outline" },
  outlineSquare: { type: "square", frameStyle: "outline" }
}

const frameConfig = computed(() => STYLE_CONFIG[props.style])
const { configs } = storeToRefs(useConfigsStore())

const innerIconColor = computed(() =>
  frameConfig.value.frameStyle === "outline" ? props.color : configs.value.general.colors.primary.bgColor
)

const innerIconSize = computed(() => (frameConfig.value.type === "none" ? props.size : Math.floor(props.size * 0.7)))

const createIconPath = (fillColor: string) =>
  h("path", {
    d: props.icon,
    fill: fillColor,
    stroke: "none"
  })

const createSimpleIcon = () =>
  h(
    "svg",
    {
      width: `${props.size}`,
      height: `${props.size}`,
      viewBox: "0 0 24 24",
      fill: "none",
      style: {
        display: "inline-block",
        verticalAlign: "middle"
      }
    },
    [createIconPath(props.color)]
  )

const createSquareFramedIcon = () => {
  const isOutline = frameConfig.value.frameStyle === "outline"
  const iconSizeInViewBox = (innerIconSize.value / props.size) * 40
  const iconOffset = (40 - iconSizeInViewBox) / 2

  return h(
    "svg",
    {
      width: `${props.size}`,
      height: `${props.size}`,
      viewBox: "0 0 40 40",
      xmlns: "http://www.w3.org/2000/svg",
      role: "img",
      style: {
        display: "inline-block",
        verticalAlign: "middle",
        flexShrink: 0
      }
    },
    [
      h("rect", {
        x: "0.5",
        y: "0.5",
        width: "39",
        height: "39",
        rx: "0",
        fill: isOutline ? "none" : props.color,
        stroke: isOutline ? props.color : "none",
        "stroke-width": isOutline ? "1" : "0"
      }),
      h("g", { transform: `translate(${iconOffset}, ${iconOffset})` }, [
        h(
          "svg",
          {
            width: `${iconSizeInViewBox}`,
            height: `${iconSizeInViewBox}`,
            viewBox: "0 0 24 24"
          },
          [createIconPath(innerIconColor.value)]
        )
      ])
    ]
  )
}

const createCircularFramedIcon = () => {
  const isOutline = frameConfig.value.frameStyle === "outline"

  return h(
    "div",
    {
      style: {
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        width: `${props.size}px`,
        height: `${props.size}px`,
        borderRadius: "50%",
        backgroundColor: isOutline ? "transparent" : props.color,
        border: isOutline ? `1px solid ${props.color}` : "none",
        flexShrink: 0
      }
    },
    [
      h(
        "svg",
        {
          width: `${innerIconSize.value}`,
          height: `${innerIconSize.value}`,
          viewBox: "0 0 24 24",
          fill: "none",
          style: { display: "block" }
        },
        [createIconPath(innerIconColor.value)]
      )
    ]
  )
}

const iconComponent = computed(() => {
  if (!props.icon) return null

  switch (frameConfig.value.type) {
    case "none": {
      return createSimpleIcon()
    }
    case "square": {
      return createSquareFramedIcon()
    }
    case "circle": {
      return createCircularFramedIcon()
    }
    default: {
      return null
    }
  }
})
</script>

<template>
  <component :is="iconComponent" v-if="iconComponent" />
</template>
