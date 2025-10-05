<script setup lang="ts">
import type { Editor } from "@tiptap/vue-3"
import LinkPopover from "./LinkPopover.vue"
import ToolbarButton from "./ToolbarButton.vue"

interface Props {
  editor: Editor | null
}

const props = defineProps<Props>()

const linkOpen = ref(false)
const linkUrl = ref("")

const handleLinkAction = (action: "apply" | "clear" | "open") => {
  const e = unref(props.editor)
  if (!e) return

  switch (action) {
    case "open": {
      const linkAttrs = e.getAttributes("link")
      linkUrl.value = linkAttrs.href || ""
      linkOpen.value = true
      break
    }
    case "apply": {
      if (linkUrl.value.trim() === "") {
        e.chain().focus().extendMarkRange("link").unsetLink().run()
      } else {
        e.chain().focus().extendMarkRange("link").setLink({ href: linkUrl.value.trim() }).run()
      }
      linkOpen.value = false
      break
    }
    case "clear": {
      e.chain().focus().extendMarkRange("link").unsetLink().run()
      linkOpen.value = false
      break
    }
  }
}

const toggleBold = () => {
  props.editor?.chain().focus().toggleBold().run()
}

const toggleItalic = () => {
  props.editor?.chain().focus().toggleItalic().run()
}

const toggleStrike = () => {
  props.editor?.chain().focus().toggleStrike().run()
}

const toggleBulletList = () => {
  props.editor?.chain().focus().toggleBulletList().run()
}

const toggleOrderedList = () => {
  props.editor?.chain().focus().toggleOrderedList().run()
}

const setTextAlign = (alignment: "left" | "center" | "right" | "justify") => {
  props.editor?.chain().focus().setTextAlign(alignment).run()
}
</script>

<template>
  <div v-if="editor" class="flex items-center gap-4 bg-muted rounded-lg p-2">
    <ToolbarButton
      icon="i-lucide-bold"
      tooltip="Bold"
      :is-active="editor.isActive('bold')"
      :disabled="!editor.can().chain().focus().toggleBold().run()"
      @click="toggleBold"
    />

    <ToolbarButton
      icon="i-lucide-italic"
      tooltip="Italic"
      :is-active="editor.isActive('italic')"
      :disabled="!editor.can().chain().focus().toggleItalic().run()"
      @click="toggleItalic"
    />

    <LinkPopover
      v-model:is-open="linkOpen"
      v-model:link-url="linkUrl"
      :is-active="editor.isActive('link')"
      @action="handleLinkAction"
    />

    <ToolbarButton
      icon="i-lucide-strikethrough"
      tooltip="Strike"
      :is-active="editor.isActive('strike')"
      :disabled="!editor.can().chain().focus().toggleStrike().run()"
      @click="toggleStrike"
    />

    <ToolbarButton
      icon="i-lucide-list"
      tooltip="Bullet List"
      :is-active="editor.isActive('bulletList')"
      :disabled="!editor.can().chain().focus().toggleBulletList().run()"
      @click="toggleBulletList"
    />

    <ToolbarButton
      icon="i-lucide-list-ordered"
      tooltip="Ordered List"
      :is-active="editor.isActive('orderedList')"
      :disabled="!editor.can().chain().focus().toggleOrderedList().run()"
      @click="toggleOrderedList"
    />

    <div class="w-px h-6 bg-border" />

    <ToolbarButton
      icon="i-lucide-align-left"
      tooltip="Align Left"
      :is-active="editor.isActive({ textAlign: 'left' })"
      :disabled="!editor.can().chain().focus().setTextAlign('left').run()"
      @click="setTextAlign('left')"
    />

    <ToolbarButton
      icon="i-lucide-align-center"
      tooltip="Align Center"
      :is-active="editor.isActive({ textAlign: 'center' })"
      :disabled="!editor.can().chain().focus().setTextAlign('center').run()"
      @click="setTextAlign('center')"
    />

    <ToolbarButton
      icon="i-lucide-align-right"
      tooltip="Align Right"
      :is-active="editor.isActive({ textAlign: 'right' })"
      :disabled="!editor.can().chain().focus().setTextAlign('right').run()"
      @click="setTextAlign('right')"
    />

    <ToolbarButton
      icon="i-lucide-align-justify"
      tooltip="Justify"
      :is-active="editor.isActive({ textAlign: 'justify' })"
      :disabled="!editor.can().chain().focus().setTextAlign('justify').run()"
      @click="setTextAlign('justify')"
    />
  </div>
</template>
