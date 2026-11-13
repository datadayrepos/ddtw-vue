<template>
  <DdtwSlotListener
    @click="onClick"
    @mouseleave="onMouseleave"
    @mouseenter="onMouseenter"
  >
    <DdtwButton>HELLO</DdtwButton>
  </DdtwSlotListener>
</template>

<script lang="ts" setup>
import { DdtwButton, DdtwSlotListener } from '../../../../src/index'

function onClick() {
  // eslint-disable-next-line no-console -- Demonstrate the slot-listener event in this example.
  console.log('onClick from slot-listener')
}
function onMouseenter() {
  // eslint-disable-next-line no-console -- Demonstrate the slot-listener event in this example.
  console.log('onMouseenter from slot-listener')
}
function onMouseleave() {
  // eslint-disable-next-line no-console -- Demonstrate the slot-listener event in this example.
  console.log('onMouseleave from slot-listener')
}
</script>
