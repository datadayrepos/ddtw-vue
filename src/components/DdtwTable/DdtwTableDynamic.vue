<template>
  <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
    <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
      <slot />
      <DdtwTableHead v-if="headers.length > 0">
        <DdtwTableHeadCell v-for="header in headers" :key="header">
          {{ header }}
        </DdtwTableHeadCell>
      </DdtwTableHead>
      <DdtwTableBody v-if="dataRows.length > 0">
        <DdtwTableRow v-for="(row, rowIndex) in dataRows" :key="rowIndex">
          <DdtwTableCell v-for="(cell, cellIndex) in row" :key="cellIndex">
            <slot :name="`cell-${rowIndex}-${cellIndex}`" :cell="cell">
              <!-- component -->
              <template v-if="isComponentCell(cell)">
                <div class="flex justify-center items-center space-x-4">
                  <component
                    :is="cell.component" v-bind="cell.props" :class="cell.props.class"
                    @click="handleClick($event, cell.props)"
                    @update:model-value="handleUpdate($event, cell.props)"
                  >
                    <template v-if="cell.slot && cell.slot.location === 'prefix'" #prefix>
                      <component :is="cell.slot.component" class="h-5 w-5 mr-2" />
                    </template>

                    {{ cell.props.text }}

                    <template v-if="cell.slot && cell.slot.location === 'suffix'" #suffix>
                      <component :is="cell.slot.component" class="h-5 w-5 ml-2" />
                    </template>
                  </component>
                </div>
              </template>
              <!-- image -->
              <template v-else-if="isImageCell(cell)">
                <div class="flex justify-center items-center w-full h-full">
                  <img :src="cell.src" :alt="cell.alt" class="w-8 h-8 object-cover">
                </div>
              </template>
              <!-- image text -->
              <template v-else-if="isImageTextCell(cell)">
                <div class="flex items-center">
                  <img :src="cell.src" :alt="cell.alt" class="w-8 h-8 mr-2">
                  <span> {{ cell.text }}</span>
                </div>
              </template>
              <!-- Icon text cell -->
              <template v-else-if="isIconTextCell(cell)">
                <div class="flex items-center">
                  <component
                    :is="cell.component"
                    class="w-8 h-8 mr-2"
                  />
                  <span>{{ cell.text }}</span>
                </div>
              </template>

              <!-- clean text cell -->
              <template v-else-if="isTextCell(cell)">
                <span> {{ cell.text }}</span>
                <!-- Bind the dynamic class using :class -->
                <span :class="cell.extrastyle"> {{ cell.extratext }}</span>
              </template>
            </slot>
          </DdtwTableCell>
        </DdtwTableRow>
      </DdtwTableBody>
    </table>
  </div>
</template>

<script lang="ts" setup>
import type { ComponentCell, IconTextCell, ImageCell, ImageTextCell, TableCellType, TableRowType, TextCell } from './types'
import { provide } from 'vue'
import DdtwTableBody from './DdtwTableBody.vue'
import DdtwTableCell from './DdtwTableCell.vue'
import DdtwTableHead from './DdtwTableHead.vue'
import DdtwTableHeadCell from './DdtwTableHeadCell.vue'
import DdtwTableRow from './DdtwTableRow.vue'

const props = defineProps({
  dataRows: {
    default: () => [],
    type: Array as () => TableRowType[], // can be string, row, component, no restriction here - user be aware
  },
  headers: {
    default: () => [],
    type: Array as () => string[],
  },
  hoverable: {
    default: false,
    type: Boolean,
  },
  striped: {
    default: false,
    type: Boolean,
  },
  stripedColumns: {
    default: false,
    type: Boolean,
  },
})

const emit = defineEmits(['update:modelValue', 'click'])

function handleClick(evt: any, data: any) {
  emit('click', evt, data)
}

function handleUpdate(evt: any, data: any) {
  emit('update:modelValue', evt, data)
}

// Type guards to narrow down the type of cell
function isComponentCell(cell: TableCellType): cell is ComponentCell {
  return typeof cell === 'object' && cell !== null && cell.type === 'component'
}

function isImageCell(cell: TableCellType): cell is ImageCell {
  return typeof cell === 'object' && cell !== null && cell.type === 'image'
}

function isImageTextCell(cell: TableCellType): cell is ImageTextCell {
  return typeof cell === 'object' && cell !== null && cell.type === 'imagetext'
}

function isIconTextCell(cell: TableCellType): cell is IconTextCell {
  return typeof cell === 'object' && cell !== null && cell.type === 'iconText'
}

function isTextCell(cell: TableCellType): cell is TextCell {
  return typeof cell === 'object' && cell !== null && cell.type === 'text'
}

provide('hoverable', props.hoverable)
provide('striped', props.striped)
provide('stripedColumns', props.stripedColumns)
</script>
