<template>
  <li>
    <div
      :class="tabClasses"
      @click="tryActivateTab"
    >
      {{ title }}
    </div>
  </li>
</template>

<script lang="ts" setup>
import type { TabsVariant } from './types'
import { inject, toRef } from 'vue'
import { useTabClasses } from './composables/useTabClasses'
import {
  TAB_ACTIVATE_INJECTION_KEY,
  TAB_STYLE_INJECTION_KEY,
} from './injection/config'

const props = defineProps({
  active: {
    default: false,
    type: Boolean,
  },
  disabled: {
    default: false,
    type: Boolean,
  },
  name: {
    required: true,
    type: String,
  },
  title: {
    default: '',
    type: String,
  },
})

const variant = inject<TabsVariant>(TAB_STYLE_INJECTION_KEY)
if (!variant) {
  console.warn('you can\'t use Tab outside of Tabs component. No tab style injection found')
}

const onActivate = inject<(value: string) => void>(TAB_ACTIVATE_INJECTION_KEY)
if (!onActivate) {
  console.warn('you can\'t use Tab outside of Tabs component. No tab activate injection found')
}

function tryActivateTab() {
  if (props.disabled)
    return
  if (!onActivate)
    return console.warn('no onActivate')
  onActivate(props.name)
}

const { tabClasses } = useTabClasses({
  active: toRef(props, 'active'),
  disabled: toRef(props, 'disabled'),
  variant,
})
</script>
