<template>
  <component
    :is="buttonComponent"
    :class="wrapperClasses"
    :[linkAttr]="href"
    :disabled="buttonComponent === 'button' && disabled"
  >
    <div
      v-if="($slots.prefix || loadingPrefix)"
      class="mr-2"
    >
      <!-- automatically add mr class if slot provided or loading -->
      <DdtwSpinner
        v-if="loadingPrefix"
        :color="spinnerColor"
        :size="spinnerSize"
      />
      <slot
        v-else
        name="prefix"
      />
    </div>

    <span :class="spanClasses">
      <slot />
    </span>

    <div
      v-if="($slots.suffix || loadingSuffix)"
      class="ml-2"
    >
      <!-- automatically add ml class if slot provided or loading -->
      <DdtwSpinner
        v-if="loadingSuffix"
        :color="spinnerColor"
        :size="spinnerSize"
      />
      <slot
        v-else
        name="suffix"
      />
    </div>
  </component>
</template>

<script lang="ts" setup>
import type { ButtonSize, ButtonVariant } from './types' // ButtonGradient, ButtonMonochromeGradient,
import { computed, resolveComponent, toRefs } from 'vue'
import DdtwSpinner from '../DdtwSpinner/DdtwSpinner.vue'
import { useButtonClasses } from './composables/useButtonClasses'
import { useButtonSpinner } from './composables/useButtonSpinner'
import { useMergeClasses } from '/@/composables/useMergeClasses'

type IButtonProps = {
  class?: string
  color?: ButtonVariant
  // gradient?: ButtonGradient | null
  size?: ButtonSize
  // shadow?: ButtonMonochromeGradient | null
  pill?: boolean
  square?: boolean
  outline?: boolean
  loading?: boolean
  loadingPosition?: 'suffix' | 'prefix'
  disabled?: boolean
  href?: string
  tag?: string
  template?: object // for passing components
}
const props = withDefaults(defineProps<IButtonProps>(), {
  class: '',
  color: 'default',
  disabled: false,
  href: '',
  loading: false,
  loadingPosition: 'prefix',
  outline: false,
  //  shadow: null,
  pill: false,
  //  gradient: null,
  size: 'md',
  square: false,
  tag: 'a',
})

const buttonClasses = computed(() => useButtonClasses(toRefs(props)))
const wrapperClasses = computed(() => useMergeClasses(buttonClasses.value.wrapperClasses))
const spanClasses = computed(() => useMergeClasses(buttonClasses.value.spanClasses))

// const isOutlineGradient = computed(() => props.outline && props.gradient)

const loadingPrefix = computed(() => props.loading && props.loadingPosition === 'prefix')
const loadingSuffix = computed(() => props.loading && props.loadingPosition === 'suffix')

const { color: spinnerColor, size: spinnerSize } = useButtonSpinner(toRefs(props))

const linkComponent = props.tag !== 'a' ? resolveComponent(props.tag) : 'a'
const buttonComponent = props.href ? linkComponent : 'button'
const linkAttr = props.tag === 'router-link' || props.tag === 'nuxt-link' ? 'to' : 'href'
</script>
