<template>
  <label>
    <span :class="labelClasses">{{ label }}</span>
    <span :class="wrapperClasses">
      <textarea
        v-model="model"
        v-bind="$attrs"
        :class="textareaClasses"
        :rows="rows"
        :placeholder="placeholder"
        :autocomplete="autocomplete"
      />
      <span
        v-if="$slots.footer"
        :class="footerClasses"
      >
        <slot name="footer" />
      </span>
    </span>
  </label>
</template>

<script setup lang="ts">
import type { CommonAutoFill } from './../DdtwInput/types'
import { computed } from 'vue'
import { useTextareaClasses } from './composables/useTextareaClasses'

type TextareaProps = {
  modelValue?: string
  label?: string
  rows?: number
  custom?: boolean
  placeholder?: string
  autocomplete?: CommonAutoFill
}

const props = withDefaults(defineProps<TextareaProps>(), {
  autocomplete: 'off',
  custom: false,
  label: 'Your message',
  modelValue: '',
  placeholder: 'Write your message here...',
  rows: 4,
})

const emit = defineEmits(['update:modelValue'])

defineOptions({
  inheritAttrs: false,
})

const model = computed({
  get() {
    return props.modelValue
  },
  set(val) {
    emit('update:modelValue', val)
  },
})

const { textareaClasses, labelClasses, wrapperClasses, footerClasses } = useTextareaClasses(props.custom)
</script>
