<template>
  <component
    :is="wrapperType"
    :class="badgeClasses"
    :href="href"
  >
    <slot name="icon" />
    <slot name="default" />
  </component>
</template>

<script lang="ts" setup>
import type { BadgeSize, BadgeType } from './types'
import { computed, useSlots } from 'vue'
import { useBadgeClasses } from './composables/useBadgeClasses'

type IBadgeProps = {
  type?: BadgeType
  size?: BadgeSize
  href?: string | null
}
const props = withDefaults(defineProps<IBadgeProps>(), {
  href: null,
  size: 'xs',
  type: 'default',
})

const slots = useSlots()
const isContentEmpty = computed(() => !slots.default)
const wrapperType = computed(() => (props.href ? 'a' : 'span'))

const { badgeClasses } = useBadgeClasses(props, { isContentEmpty })
</script>
