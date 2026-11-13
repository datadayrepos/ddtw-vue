<template>
  <div class="relative">
    <div
      :class="avatarPlaceholderWrapperClasses"
    >
      <img
        v-if="img && !imageError"
        :alt="alt"
        :class="avatarClasses"
        :src="img"
        @error="setImageError"
      >
      <div
        v-else-if="!initials && hasPlaceholder"
        :class="avatarPlaceholderClasses"
      >
        <slot name="placeholder" />
      </div>
      <svg
        v-else-if="!img && !initials"
        :class="avatarPlaceholderClasses"
        fill="currentColor"
        viewBox="0 0 20 20"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          clip-rule="evenodd"
          d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
          fill-rule="evenodd"
        />
      </svg>
      <div
        v-else
        :class="avatarPlaceholderInitialsClasses"
      >
        {{ initials }}
      </div>
    </div>
    <span
      v-if="status"
      :class="avatarDotClasses"
      :data-pos="statusPosition"
    />
  </div>
</template>

<script lang="ts" setup>
import type { AvatarSize, AvatarStatus, AvatarStatusPosition } from './types'
import { computed, type PropType, ref, toRefs, useSlots } from 'vue'
import { useAvatarClasses } from '/@/components/DdtwAvatar/composables/useAvatarClasses'

const props = defineProps({
  alt: {
    default: 'Avatar',
    type: String,
  },
  bordered: {
    default: false,
    type: Boolean,
  },
  img: {
    default: '',
    type: String,
  },
  initials: {
    default: null,
    type: String,
  },
  rounded: {
    default: false,
    type: Boolean,
  },
  size: {
    default: 'md',
    type: String as PropType<AvatarSize>,
  },
  stacked: {
    default: false,
    type: Boolean,
  },
  status: {
    default: null,
    type: String as PropType<AvatarStatus>,
  },
  statusPosition: {
    default: 'top-right',
    type: String as PropType<AvatarStatusPosition>,
  },
})

const imageError = ref(false)

function setImageError() {
  imageError.value = true
}

const slots = useSlots()
const hasPlaceholder = computed(() => slots.placeholder)

const {
  avatarClasses,
  avatarDotClasses,
  avatarPlaceholderClasses,
  avatarPlaceholderInitialsClasses,
  avatarPlaceholderWrapperClasses,
} = useAvatarClasses(toRefs(props))
</script>
