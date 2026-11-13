<template>
  <label :class="[labelClasses, labelOrder]">
    <input
      v-model="model"
      :disabled="disabled"
      class="sr-only peer"
      type="checkbox"
    >
    <span :class="[toggleClasses, toggleSize, toggleColor]" />
    <span :class="[toggleBallClasses, toggleBallOrder]">{{ label }}</span>
  </label>
</template>

<script lang="ts" setup>
import type { InputSize } from '/@/components/DdtwInput/types'
import { computed, toRefs } from 'vue'
import { useToggleClasses } from './composables/useToggleClasses'

type ToggleProps = {
  color?: string
  disabled?: boolean
  label?: string
  modelValue?: boolean
  size?: InputSize
  reverse?: boolean
}

const props = withDefaults(defineProps<ToggleProps>(), {
  color: '',
  disabled: false,
  label: '',
  modelValue: false,
  reverse: false,
  size: 'md',
})

const emit = defineEmits(['update:modelValue'])
const model = computed({
  get() {
    return props.modelValue
  },
  set(val) {
    emit('update:modelValue', val)
  },
})

const {
  labelClasses,
  toggleSize,
  toggleClasses,
  toggleColor,
  toggleBallClasses,
  toggleBallOrder,
  labelOrder,
} = useToggleClasses(toRefs(props))
</script>
