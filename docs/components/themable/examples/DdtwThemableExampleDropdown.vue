<template>
  <div class="vp-raw">
    <span class="">Select theme:</span>
    <div class="grid xs:grid-cols-5 md:grid-cols-7 mb-5 mt-2">
      <DdtwRadio
        v-model="activeTheme"
        value="blue"
      >
        Blue
      </DdtwRadio>
      <DdtwRadio
        v-model="activeTheme"
        value="green"
      >
        Green
      </DdtwRadio>
      <DdtwRadio
        v-model="activeTheme"
        value="pink"
      >
        Pink
      </DdtwRadio>
      <DdtwRadio
        v-model="activeTheme"
        value="purple"
      >
        Purple
      </DdtwRadio>
      <DdtwRadio
        v-model="activeTheme"
        value="red"
      >
        Red
      </DdtwRadio>
    </div>
    <div class="inline-flex align-center gap-2 flex-wrap">
      <DdtwThemable :theme="activeTheme">
        <DdtwDropdown text="Dropdown">
          Dropdown content...
        </DdtwDropdown>
      </DdtwThemable>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { FlowbiteTheme } from '../../../../src/components/utils/DdtwThemable/types'
import { ref } from 'vue'
import { DdtwDropdown, DdtwRadio, DdtwThemable } from '../../../../src/index'

const activeTheme = ref<FlowbiteTheme>('blue')
</script>
