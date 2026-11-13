<template>
  <div
    :class="wrapperClasses"
    v-bind="$attrs"
  >
    <a
      :class="aClasses"
      :href="href"
    >
      <img
        :alt="alt"
        :class="imageClasses"
        :src="src"
      >
      <span :class="mameClasses">{{ name }}</span>
    </a>
  </div>
</template>

<script setup lang="ts">
import { twMerge } from 'tailwind-merge'
import { useAttrs } from 'vue'

type IFooterProps = {
  href: string
  src: string
  alt?: string
  name: string
  imageClass?: string
  nameClass?: string
  aClass?: string
}

const props = withDefaults(defineProps<IFooterProps>(), {
  aClass: '',
  alt: '',
  href: '',
  imageClass: '',
  name: '',
  nameClass: '',
  src: '',
})

defineOptions({
  inheritAttrs: false,
})

const attrs = useAttrs()
const wrapperClasses = twMerge('mb-6 md:mb-0', attrs.class as string)
const aClasses = twMerge('flex items-center', props.aClass)
const imageClasses = twMerge('h-8 mr-3', props.imageClass)
const mameClasses = twMerge('self-center text-2xl font-semibold whitespace-nowrap dark:text-white', props.nameClass)
</script>
