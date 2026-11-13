<template>
  <div class="vp-raw">
    <div class="flex align-center gap-2 flex-wrap">
      <DdtwThemable
        v-for="themeName in themes"
        :key="themeName"
        :theme="themeName"
      >
        <DdtwButton>
          {{ themeName }}
        </DdtwButton>
      </DdtwThemable>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { PropType } from 'vue'
import type { FlowbiteTheme } from '../../../../src/components/utils/DdtwThemable/types'
import { DdtwButton, DdtwThemable } from '../../../../src/index'

defineProps({
  theme: {
    default: 'blue',
    type: String as PropType<FlowbiteTheme>,
  },
})

const themes: FlowbiteTheme[] = ['blue', 'green', 'red', 'pink', 'purple']
</script>
