<template>
  <li
    v-bind="$attrs"
    :class="liClasses"
  >
    <component
      :is="linkComponent"
      :[linkAttr]="href"
      :class="aClasses"
    >
      <slot />
    </component>
  </li>
</template>

<script setup lang="ts">
import { twMerge } from 'tailwind-merge'
import { resolveComponent, useAttrs } from 'vue'

type IFooterLinkProps = {
  href: string
  aClass?: string
  component?: string
}

const props = withDefaults(defineProps<IFooterLinkProps>(), {
  aClass: '',
  component: 'a',
  href: '',
})

defineOptions({
  inheritAttrs: false,
})

const attrs = useAttrs()
const linkComponent = props.component === 'a' ? 'a' : resolveComponent(props.component)
const linkAttr = props.component === 'router-link' ? 'to' : 'href'
const aClasses = twMerge('hover:underline', props.aClass)
const liClasses = twMerge('mr-4 md:mr-6 last:mr-0', attrs.class as string)
</script>
