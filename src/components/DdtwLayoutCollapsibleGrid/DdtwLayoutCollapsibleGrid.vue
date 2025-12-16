<template>
  <div class="flex justify-center items-center space-x-4">
    <!-- Delete -->
    <DdtwButton
      color="red"
      :outline="true"
      :disabled="disabled"
      @click="handleClick('delete')"
    >
      <template #prefix>
        <TrashIcon class="mr-2 h-5 w-5" />
      </template>
      {{ buttonDelete }}
    </DdtwButton>
    <!-- Edit -->
    <DdtwButton
      color="primary"
      :disabled="disabled"
      @click="handleClick('edit')"
    >
      <template #prefix>
        <EditIcon class="mr-2 h-5 w-5" />
      </template>
      {{ buttonEdit }}
    </DdtwButton>
  </div>
</template>

<script setup lang="ts">
// Wrapper of two buttons
// Can also passed into table slots as one component
import { EditIcon, TrashIcon } from '@datadayrepos/icons'
import DdtwButton from '../DdtwButton/DdtwButton.vue'

const props = defineProps({
  buttonDelete: {
    default: 'Delete',
    type: String,
  },
  buttonEdit: {
    default: 'Edit',
    type: String,
  },
  disabled: {
    default: false,
    type: Boolean,
  },
  index: {
    type: Number,
  },
})

const emit = defineEmits(['click'])

function handleClick(cmd: string) {
  if (!props.disabled)
    emit('click', cmd)
}
</script>
