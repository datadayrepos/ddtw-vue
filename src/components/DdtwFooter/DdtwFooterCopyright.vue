<template>
  <span
    v-bind="$attrs"
    :class="spanClasses"
  >
    &copy; {{ year }}
    <component
      :is="byComponent"
      :class="aClasses"
      :href="href"
    >{{ by }}</component>
    {{ copyrightMessage }}
  </span>
</template>

<script setup lang="ts">
import { twMerge } from 'tailwind-merge'
import { useAttrs } from 'vue'

type IFooterCopyrigthProps = {
  year?: string | number
  by?: string
  href?: string
  aClass?: string
  copyrightMessage?: string
}

const props = withDefaults(defineProps<IFooterCopyrigthProps>(), {
  aClass: '',
  by: '',
  copyrightMessage: 'All Rights Reserved.',
  href: '',
  year: new Date().getFullYear(),
})

defineOptions({
  inheritAttrs: false,
})

const attrs = useAttrs()
const spanClasses = twMerge('block text-sm text-gray-500 sm:text-center dark:text-gray-400', attrs.class as string)
const aClasses = twMerge(props.href ? 'hover:underline' : 'ml-1', props.aClass)
const byComponent = props.href ? 'a' : 'span'
</script>
