<template>
  <div>
    <div class="bg-black bg-opacity-50 fixed inset-0 z-40" />
    <div
      ref="modalRef"
      tabindex="0" aria-inert="true"
      class="overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 w-full md:inset-0 h-modal md:h-full grid"
      @click.self="clickOutside"
      @keyup.esc="closeWithEsc"
    >
      <div
        :class="`${modalSizeClasses[size]} ${modalPositionClasses[position]}`"
        class="relative p-4 w-full"
      >
        <div ref="modalContent">
          <!-- Modal Content Here -->
          <slot />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// General modal that creates an overlay with click utside, and ONE slot for all modal content
// There is no color set here, this is only the background
import type { Ref } from 'vue'
import type { ModalProps } from './types'
import { onMounted, ref } from 'vue'
import { modalPositionClasses, modalSizeClasses } from './useClasses'

const props = withDefaults(defineProps<ModalProps>(), {
  notEscapable: false,
  persistent: false,
  position: 'center',
  size: '2xl',
})

const emit = defineEmits(['close', 'clickOutside'])

const modalContent: Ref<HTMLDivElement | null> = ref(null)

function closeModal() {
  emit('close')
}

function clickOutside() {
  if (!props.persistent) {
    emit('clickOutside')
    closeModal()
  }
}

function closeWithEsc() {
  if (!props.notEscapable && !props.persistent)
    closeModal()
}

const modalRef: Ref<HTMLElement | null> = ref(null)
onMounted(() => {
  if (modalRef.value)
    modalRef.value.focus()
})
</script>
