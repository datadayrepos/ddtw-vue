<template>
  <div>
    <div class="bg-gray-900 bg-opacity-50 dark:bg-opacity-80 fixed inset-0 z-40" />
    <div
      ref="modalRef"
      class="overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 w-full md:inset-0 h-modal md:h-full grid"
      tabindex="0"
      @click.self="clickOutside"
      @keyup.esc="closeWithEsc"
    >
      <div
        :class="`${modalSizeClasses[size]} ${modalPositionClasses[position]}`"
        class="relative p-4 w-full"
      >
        <!-- Modal content -->
        <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
          <!-- Modal header -->
          <div
            :class="$slots.header ? 'border-b border-gray-200 dark:border-gray-600' : ''"
            class="p-4 rounded-t flex justify-between items-center"
          >
            <slot name="header" />
            <button
              v-if="!persistent"
              aria-label="close"
              class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ms-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
              type="button"
              @click="closeModal"
            >
              <slot name="close-icon">
                <CloseCrossIcon class="h-5 w-5" />
              </slot>
            </button>
          </div>
          <!-- Modal body -->
          <div
            :class="$slots.header ? '' : 'pt-0'"
            class="p-6"
          >
            <slot name="body" />
          </div>
          <!-- Modal footer -->
          <div
            v-if="$slots.footer"
            class="p-6 rounded-b border-gray-200 border-t dark:border-gray-600"
          >
            <slot name="footer" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { ModalProps } from './types'
import { CloseCrossIcon } from '@datadayrepos/icons'
import { onMounted, type Ref, ref } from 'vue'
import { modalPositionClasses, modalSizeClasses } from './useClasses'

const props = withDefaults(defineProps<ModalProps>(), {
  notEscapable: false,
  persistent: false,
  position: 'center',
  size: '2xl',
})

const emit = defineEmits(['close', 'clickOutside'])

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
  if (modalRef.value) {
    modalRef.value.focus()
  }
})
</script>
