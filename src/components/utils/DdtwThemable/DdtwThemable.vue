<template>
  <slot />
</template>

<script lang="ts" setup>
import type { FlowbiteTheme } from './types'
import { provide, toRef } from 'vue'
import { DDTW_THEMABLE_INJECTION_KEY } from './injection/config'

type IDdtwThemableProps = {
  theme?: FlowbiteTheme
}

const props = withDefaults(defineProps<IDdtwThemableProps>(), {
  theme: 'blue',
})

provide(DDTW_THEMABLE_INJECTION_KEY, toRef(props, 'theme'))
</script>
