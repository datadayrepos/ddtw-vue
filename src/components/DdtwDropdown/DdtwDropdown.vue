<template>
  <div
    ref="wrapper"
    class="inline-flex relative"
  >
    <div class="inline-flex items-center">
      <DdtwSlotListener @click="onToggle">
        <slot name="trigger">
          <DdtwButton>
            {{ text }}
            <template #suffix>
              <svg
                class="w-4 h-4 ml-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M19 9l-7 7-7-7"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                />
              </svg>
            </template>
          </DdtwButton>
        </slot>
      </DdtwSlotListener>
    </div>
    <transition :name="transitionName">
      <div
        v-if="visible"
        ref="content"
        :class="[contentClasses]"
        :style="contentStyles"
      >
        <DdtwSlotListener @click="onHide">
          <slot />
        </DdtwSlotListener>
      </div>
    </transition>
  </div>
</template>

<script lang="ts" setup>
import { computed, ref, toRef, watch } from 'vue'
import { onClickOutside } from '@vueuse/core'
import type { DropdownPlacement } from './types'
import { useDropdownClasses } from './composables/useDropdownClasses'
import DdtwButton from '/@/components/DdtwButton/DdtwButton.vue'
import DdtwSlotListener from '/@/components/utils/DdtwSlotListener/DdtwSlotListener.vue'

const props = withDefaults(
  defineProps<{
    placement?: DropdownPlacement
    text?: string
    transition?: string
    closeInside?: boolean
    alignToEnd?: boolean
  }>(),
  {
    alignToEnd: false,
    closeInside: false,
    placement: 'bottom',
    text: '',
    transition: '',
  },
)
const emit = defineEmits<{
  show: []
  hide: []
}>()
const visible = ref(false)
function onHide() {
  if (props.closeInside)
    visible.value = false
}
const onToggle = () => (visible.value = !visible.value)

watch(
  visible,
  (isVisible: boolean) => {
    if (isVisible) {
      emit('show')
    }
    else {
      emit('hide')
    }
  },
)

const placementTransitionMap: Record<DropdownPlacement, string> = {
  bottom: 'to-bottom',
  left: 'to-left',
  right: 'to-right',
  top: 'to-top',
}

const transitionName = computed(() => {
  if (props.transition === null)
    return placementTransitionMap[props.placement]
  return props.transition
})

const content = ref<HTMLDivElement>()
const wrapper = ref<HTMLDivElement>()

const { contentClasses, contentStyles } = useDropdownClasses({
  alignToEnd: toRef(props, 'alignToEnd'),
  contentRef: content,
  placement: toRef(props, 'placement'),
  visible,
})

onClickOutside(wrapper, () => {
  if (!visible.value)
    return
  visible.value = false
})
</script>

<style scoped>
/* transitions */
.to-bottom-enter-active,
.to-bottom-leave-active,
.to-left-enter-active,
.to-left-leave-active,
.to-right-enter-active,
.to-right-leave-active,
.to-top-enter-active,
.to-top-leave-active {
  transition: all 250ms;
}

/* to top */
.to-top-enter-active, .to-top-leave-to {
  opacity: 0;
  transform: translateY(10px);
}
.to-top-leave, .to-top-enter-to {
  opacity: 1;
  transform: translateY(0);
}

/* to right */
.to-right-enter-active, .to-right-leave-to {
  opacity: 0;
  transform: translateX(-10px);
}
.to-right-leave, .to-right-enter-to {
  opacity: 1;
  transform: translateX(0);
}

/* to bottom */
.to-bottom-enter-active, .to-bottom-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}
.to-bottom-leave, .to-bottom-enter-to {
  opacity: 1;
  transform: translateY(0);
}

/* to left */
.to-left-enter-active, .to-left-leave-to {
  opacity: 0;
  transform: translateX(10px);
}
.to-left-leave, .to-left-enter-to {
  opacity: 1;
  transform: translateX(0);
}
</style>
