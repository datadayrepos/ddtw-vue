<template>
  <div class="vp-raw flex justify-start">
    <DdtwButton @click="showModal">
      {{ triggerText }}
    </DdtwButton>
    <DdtwModal
      v-if="isShowModal"
      :not-escapable="notEscapable"
      :persistent="persistent"
      :size="size"
      :position="position"
      @close="closeModal"
    >
      <template #header>
        <div class="flex items-center text-lg">
          Terms of Service
        </div>
      </template>
      <template #body>
        <p class="text-base leading-relaxed text-gray-500 dark:text-gray-400">
          With less than a month to go before the European Union enacts new consumer privacy laws for its citizens, companies around the world are updating their terms of service agreements to comply.
        </p>
        <p class="text-base leading-relaxed text-gray-500 dark:text-gray-400">
          The European Union’s General Data Protection Regulation (G.D.P.R.) goes into effect on May 25 and is meant to ensure a common set of data rights in the European Union. It requires organizations to notify users as soon as possible of high-risk data breaches that could personally affect them.
        </p>
      </template>
      <template #footer>
        <div class="flex justify-between">
          <DdtwButton
            color="alternative"
            @click="closeModal"
          >
            Decline
          </DdtwButton>
          <DdtwButton
            color="green"
            @click="closeModal"
          >
            I accept
          </DdtwButton>
        </div>
      </template>
    </DdtwModal>
  </div>
</template>

<script lang="ts" setup>
import type { ModalPosition, ModalSize } from '../../../../src/components/DdtwModal/types'
import { ref } from 'vue'
import { DdtwButton, DdtwModal } from '../../../../src/index'

type ModalProps = {
  size?: ModalSize
  notEscapable?: boolean
  persistent?: boolean
  triggerText?: string
  position?: ModalPosition
}

withDefaults(defineProps<ModalProps>(), {
  notEscapable: false,
  persistent: false,
  position: 'center',
  size: '2xl',
  triggerText: 'Open Modal',
})

const isShowModal = ref(false)

function closeModal() {
  isShowModal.value = false
}

function showModal() {
  isShowModal.value = true
}
</script>
